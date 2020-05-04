# asusZenBookProDuoScreenBrightnessService
Service to update the ASUS ZenBook Pro Duo UX581GV Screen Brightness on Linux

This service constantly monitors a brightness file and updates the brightness of the 2 screens using `xrandr`

## Installation

### Install files and programs
To Install this service, copy the `updateOledBrightness.service`, `updateOledBrightness.js`, and `config.js` files to `/etc/systemd/system` (or wherever systemd services are located) and change `ExecStart` in the file to the real path to the `updateOledBrightness.js` file if needed. You can also move the `updateOledBrightness.js` and `config.js` files to a different folder somewhere on your system and then update the `/etc/systemd/system/updateOledBrightness.service` file to point to the correct path... either way, the `updateOledBrightness.js` file needs to run in the background as a service.

You'll also need to make sure that [Node.js](https://nodejs.org/) is installed and located at `/usr/bin/node` (You can update the `updateOledBrightness.js` file to point to the real location of `node` if you need to) and you'll need to make sure that the `xrandr` command is installed. For Arch Linux, you can run the following command, but if you are running a different distro, it may be different
```
sudo pacman -S nodejs xorg-xrandr
```

### Modify the configuration
Next, you should take a look at the `config.js` file and modify the values in that file to match your system and preferences. The `config.js` file is heavily commented so you should be able to figure out what the values should be. If you'd rather not modify the `config.js` file, you can also copy it to `localConfig.js` and make your changes there. This will allow you to do a `git pull` so you can get updates without overwriting your local configuration values. The values in `localConfig.js` will override the values in `config.js`

In particular, you'll need to make sure that the `brightnessFile` and `maxBrightnessFile` point to the correct files on your system that determine the brightness and max brightness. For Arch Linux / Gnome / Xorg, no changes need to be made, but... your system may be different.

### Install the service
Next, execute the following commands
```
sudo systemctl enable updateOledBrightness.service
sudo systemctl start updateOledBrightness.service
```

Again, this assumes that you are running Arch linux with systemd. If you are running a different version of linux or are not using systemd... then this won't work. You'll need to figure out a different way to run the `updateOledBrightness.js` file in the background as a service. This program simply monitors the `brightnessFile` and `maxBrightnessFile` files and updates the display brightness uxing the `xrandr` command when it detects a change

## Demo

[Demo video](https://player.vimeo.com/video/414545766)

## Limitations
This service has only been tested on the following:

- **Operating System**: [Arch Linux](https://www.archlinux.org/)
- **Desktop**: [Gnome](https://www.gnome.org/)
- **Window System** [Xorg](https://www.x.org/)

You could use this code as an example to develop a workable solution for other operating system / desktop / window system combinations... pull requests are welcome

**Wayland Won't Work** - This service does not currently work on [Wayland](https://wayland.freedesktop.org/) so you'll need to make sure that you are running [Xorg](https://www.x.org/). For some reason, the `xrandr` commands don't seem to work on Wayland. I'm sure there is a way, but I don't have the time to figure it out (Pull requests welcome)
