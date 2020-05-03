
module.exports = {

	// Set this to the path to the numeric brightness file. This is the file that get's updated whenever
	// you change your screen brightness. This file should only contain a positive integer
	// between 0 and whatever max brightness is at any given time. This file is constantly monitored
	// for updates and when a change is detected, the screen brightness us updated accordingly
	brightnessFile: "/sys/class/backlight/intel_backlight/brightness",

	// Set this to the path to the file that stores the numeric value of whatever the max brightness is
	// The value in this file should never change except maybe when the system is updated
	maxBrightnessFile: "/sys/class/backlight/intel_backlight/max_brightness",

	// Set this to the name of the top display. This value is passed into the xrandr command
	// to update the screen brightness of the top screen. This value may need to be changed based
	// on your operating system / desktop / window system combination. To figure out what this should
	// be set to run the following command:
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
	// example, the bottom dispaly will be set to double the brightness level of the top display
	// If the bottom display is too dim, increase this number. If it's too bright, decrease this number
	bottomDisplayAdjustment: 2.0
}
