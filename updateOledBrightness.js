#!/usr/bin/node

let fs = require("fs")
let cp = require("child_process")

let config = require("./config.js")
try {
	let localConfig = require("./localConfig.js")
	config = Object.assign(config, localConfig)
}
catch (ignore) {}

let maxBrightness = parseInt(fs.readFileSync(config.maxBrightnessFile, "utf8"))
let brightness = -1
let cycles = 0

let timer = 0
fs.watch(config.brightnessFile, "utf8", (event, fileName) => {

	if (timer) {
		clearTimeout(timer)
	}
	timer = setTimeout(detect, 300)

})
let detect = () => {
	cycles += 1
	let newBrightness = parseInt(fs.readFileSync(config.brightnessFile, "utf8"))
	if (newBrightness !== brightness || cycles > 5) {
		brightness = newBrightness
		cycles = 0

		let atBrightness = brightness / maxBrightness
		let bottomBrightness = atBrightness * config.bottomDisplayAdjustment
		atBrightness = atBrightness.toFixed(2)
		bottomBrightness = bottomBrightness.toFixed(2)
		let cmd = "/usr/bin/xrandr --output " + config.topDisplay + " --brightness " + atBrightness.toString()
		cp.spawnSync(cmd, {shell: true, uid: 1000, env: {DISPLAY: ":1"}})
		cmd = "/usr/bin/xrandr --output " + config.bottomDisplay + " --brightness " + bottomBrightness.toString()
		cp.spawnSync(cmd, {shell: true, uid: 1000, env: {DISPLAY: ":1"}})
	}

	setTimeout(detect, 1000)
}
detect()
