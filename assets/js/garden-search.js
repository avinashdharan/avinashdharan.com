(function () {
    "use strict";

    var form = document.getElementById("garden-search");
    var input = document.getElementById("garden-search-input");
    var results = document.getElementById("garden-search-results");
    if (!form || !input || !results || typeof Fuse === "undefined") return;

    var fuse;
    var selectedIndex = -1;

    function createResult(item, index) {
        var link = document.createElement("a");
        link.className = "garden-search-result";
        link.href = item.permalink;
        link.dataset.resultIndex = index;

        var title = document.createElement("strong");
        title.textContent = item.title;

        var summary = document.createElement("span");
        summary.textContent = item.summary || "Open note";

        link.appendChild(title);
        link.appendChild(summary);
        return link;
    }

    function setSelected(next) {
        var links = results.querySelectorAll("a");
        links.forEach(function (link) { link.classList.remove("is-selected"); });
        if (!links.length) {
            selectedIndex = -1;
            return;
        }
        selectedIndex = (next + links.length) % links.length;
        links[selectedIndex].classList.add("is-selected");
        links[selectedIndex].scrollIntoView({ block: "nearest" });
    }

    function render(matches, query) {
        results.replaceChildren();
        selectedIndex = -1;

        if (!matches.length) {
            var empty = document.createElement("p");
            empty.className = "garden-search-empty";
            empty.textContent = "No notes found for \"" + query + "\".";
            results.appendChild(empty);
        } else {
            matches.slice(0, 6).forEach(function (match, index) {
                results.appendChild(createResult(match.item, index));
            });
        }
        results.hidden = false;
    }

    function search() {
        var query = input.value.trim();
        if (!query) {
            results.hidden = true;
            results.replaceChildren();
            return;
        }
        if (!fuse) return;
        render(fuse.search(query), query);
    }

    fetch(input.dataset.indexUrl)
        .then(function (response) {
            if (!response.ok) throw new Error("Search index unavailable");
            return response.json();
        })
        .then(function (index) {
            fuse = new Fuse(index, {
                shouldSort: true,
                threshold: 0.35,
                ignoreLocation: true,
                minMatchCharLength: 1,
                keys: ["title", "summary", "content", "tags"]
            });
            search();
        })
        .catch(function () {
            form.classList.add("search-unavailable");
        });

    form.addEventListener("submit", function (event) {
        var selected = results.querySelector(".is-selected") || results.querySelector("a");
        if (selected) {
            event.preventDefault();
            window.location.href = selected.href;
        }
    });

    input.addEventListener("input", search);
    input.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelected(selectedIndex + 1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelected(selectedIndex - 1);
        } else if (event.key === "Escape") {
            input.value = "";
            search();
            input.blur();
        }
    });

    document.addEventListener("keydown", function (event) {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            input.focus();
        }
    });

    document.addEventListener("click", function (event) {
        if (!form.contains(event.target) && !results.contains(event.target)) results.hidden = true;
    });

    document.querySelectorAll("[data-garden-query]").forEach(function (button) {
        button.addEventListener("click", function () {
            input.value = button.dataset.gardenQuery;
            input.focus();
            search();
        });
    });

    var headerSearch = document.getElementById("garden-header-search");
    if (headerSearch) {
        headerSearch.addEventListener("click", function (event) {
            event.preventDefault();
            input.scrollIntoView({ behavior: "smooth", block: "center" });
            input.focus({ preventScroll: true });
        });
    }
}());
