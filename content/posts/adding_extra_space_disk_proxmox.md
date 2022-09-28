---
title: "Adding_extra_space_disk_proxmox"
date: 2022-01-15T02:54:17+05:30
draft: true
---

```SHELL

$ docker run --name some-nginx -v /some/content:/usr/share/nginx/html:ro -d nginx
https://github.com/avinashdharan/avinashdharan_blog
config/_default/module.toml
sudo lvextend -r -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lvhugo server --bind=192.169.3.26





https://go.dev/dl/go1.17.5.linux-amd64.tar.gz




➜  ~ df -h
Filesystem                         Size  Used Avail Use% Mounted on
udev                               948M     0  948M   0% /dev
tmpfs                              199M  1.4M  197M   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  8.8G  8.4G   26M 100% /


➜  ~ sudo fdisk -l
Disk /dev/sda: 12 GiB, 12884901888 bytes, 25165824 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 695030B4-7607-4912-B4B3-7ACA4BF5CDE2

Device       Start      End  Sectors Size Type
/dev/sda1     2048     4095     2048   1M BIOS boot
/dev/sda2     4096  2101247  2097152   1G Linux filesystem
/dev/sda3  2101248 20969471 18868224   9G Linux filesystem


Disk /dev/mapper/ubuntu--vg-ubuntu--lv: 8.102 GiB, 9659482112 bytes, 18866176 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes



➜  ~ sudo parted /dev/sda
GNU Parted 3.3
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) print
Warning: Not all of the space available to /dev/sda appears to be used, you can fix the GPT to use all of the space (an extra 4194304 blocks) or continue with the current setting?
Fix/Ignore? Fix
Model: QEMU QEMU HARDDISK (scsi)
Disk /dev/sda: 12.9GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name  Flags
 1      1049kB  2097kB  1049kB                     bios_grub
 2      2097kB  1076MB  1074MB  ext4
 3      1076MB  10.7GB  9661MB

(parted) resizepart 3
End?  [10.7GB]? 100%
(parted) print
Model: QEMU QEMU HARDDISK (scsi)
Disk /dev/sda: 12.9GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name  Flags
 1      1049kB  2097kB  1049kB                     bios_grub
 2      2097kB  1076MB  1074MB  ext4
 3      1076MB  12.9GB  11.8GB

(parted) quit
Information: You may need to update /etc/fstab.


➜  ~ df -h
Filesystem                         Size  Used Avail Use% Mounted on
udev                               948M     0  948M   0% /dev
tmpfs                              199M  1.4M  197M   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  8.8G  8.4G   26M 100% /


➜  ~ sudo fdisk -l
Disk /dev/sda: 12 GiB, 12884901888 bytes, 25165824 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 695030B4-7607-4912-B4B3-7ACA4BF5CDE2

Device       Start      End  Sectors Size Type
/dev/sda1     2048     4095     2048   1M BIOS boot
/dev/sda2     4096  2101247  2097152   1G Linux filesystem
/dev/sda3  2101248 25165790 23064543  11G Linux filesystem


Disk /dev/mapper/ubuntu--vg-ubuntu--lv: 8.102 GiB, 9659482112 bytes, 18866176 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


➜  /boot sudo pvresize /dev/sda3

  Physical volume "/dev/sda3" changed
  1 physical volume(s) resized or updated / 0 physical volume(s) not resized


➜  /boot sudo lvextend -r -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
  Size of logical volume ubuntu-vg/ubuntu-lv changed from <9.00 GiB (2303 extents) to <11.00 GiB (2815 extents).
  Logical volume ubuntu-vg/ubuntu-lv successfully resized.
resize2fs 1.45.5 (07-Jan-2020)
Filesystem at /dev/mapper/ubuntu--vg-ubuntu--lv is mounted on /; on-line resizing required
old_desc_blocks = 2, new_desc_blocks = 2
The filesystem on /dev/mapper/ubuntu--vg-ubuntu--lv is now 2882560 (4k) blocks long.

➜  /boot df -h
Filesystem                         Size  Used Avail Use% Mounted on
udev                               948M     0  948M   0% /dev
tmpfs                              199M  1.4M  197M   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv   11G  8.4G  2.0G  82% /


Link https://forum.proxmox.com/threads/resize-disk-of-ubuntu-19-10-vm-on-proxmox.70352/
https://unix.stackexchange.com/questions/138090/cant-resize-a-partition-using-resize2fs


root@entserver:/home/avins/avinashdharan/themes# git clone git@github.com:jonathanjanssens/hugo-casper3.git
git submodule add -b stable https://github.com/jpanther/congo.git themes/congo
git submodule add -b stable https://github.com/jpanther/congo.git themes/congo

```