
module.exports = {

	// Set this to the path of the numeric brightness file. This is the file that get's updated whenever
	// you change your screen brightness. This file should only contain a positive integer
	// between 0 and whatever max brightness is at any given time. This file is constantly monitored
	// for updates and when a change is detected, the screen brightness is updated accordingly
	brightnessFile: "/sys/class/backlight/intel_backlight/brightness",

	// Set this to the path of the file that stores the numeric value of whatever the max brightness is
	// The value in this file should never change except maybe when the system is updated
	maxBrightnessFile: "/sys/class/backlight/intel_backlight/max_brightness",

	// Set this to the name of the top display. This value is passed into the xrandr command
	// to update the screen brightness of the top screen. This value may need to be changed based
	// on your operating system / desktop / window system combination. To figure out what this should
	// be set to, run the following command:
	// xrandr --listmonitors
	topDisplay: "eDP-1",

	// Set this to the name of the bottom display. This value is passed into the xrandr command
	// to update the screen brightness of the bottom screen. This value may need to be changed based
	// on your operating system / desktop / window system combination. To figure out what this should
	// be set to, run the following command:
	// xrandr --listmonitors
	bottomDisplay: "DP-2",

	// Set this to the adjustment to apply to the bottom display in relation to the top display
	// The backlit bottom display is typically dimmer than the brilliant oled top display when set
	// to the same brightness and this value adjusts for that so that the 2 displays appear
	// like they have basically the same brightness. This value is a multiplier. If set to 2, for
	// example, the bottom display will be set to double the brightness level of the top display
	// If the bottom display is too dim, increase this number. If it's too bright, decrease this number
	bottomDisplayAdjustment: 2.0,

	// You shouldn't need to change this value... but you may have to if it doesn't work initially
	// The reason for this setting is that the xrandr command must be run as the currently logged in user
	// but systemd starts the service as the root user by default. So the system needs to know what
	// the uid of the currently logged in user is in order for screen brightness to actually be changed.
	// If this value is set to null (default), then the service will try to figure out the UID of
	// the currently logged in user. However, if it doesn't work, you'll need to set this to the UID
	// of the current user. The problem with setting this to a value is that screen brightness will
	// only work for the user with the UID set here. This means that if you set a UID here, then
	// it it won't work for multiple users.
	runAsUid: null
}
