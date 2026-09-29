# Contents of avinashdharan.com
Everything you see on avinashdharan.com is built from this repository. 

* Written in Markdown and generated to HTML with [Hugo](https://gohugo.io/), a static site generator.
* Theme used is [PaperMod](https://github.com/adityatelange/hugo-PaperMod).
* Built and deployed through Cloudflare Pages.
* Traffic is measured with Cloudflare Web Analytics.

## Deployment

Cloudflare Pages deploys the `main` branch with:

* Build command: `hugo --gc --minify`
* Output directory: `public`
* Environment variable: `HUGO_VERSION=0.91.2`

## Write and publish

Open this repository as an Obsidian vault once. New notes live in
`content/garden/`; the older `posts` and `til` URLs remain available.

```sh
./garden new "A note title"
./garden preview
./garden publish "Publish a note title"
```

`new` creates a dated Markdown file and opens it in Obsidian when Obsidian is
installed. `preview` serves the site at <http://127.0.0.1:1414/> until you press
Control-C. `publish` runs a production build, commits content and images, and
pushes `main`. Cloudflare Pages deploys that push.

The publish command only runs from `main`. It also stops if site code has
uncommitted changes, which keeps content commits small and predictable.
