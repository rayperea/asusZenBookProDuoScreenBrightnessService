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
let uid = 1000
let display = ":1"

let timer = 0
fs.watch(config.brightnessFile, "utf8", (event, fileName) => {
	if (timer) {
		clearTimeout(timer)
	}
	timer = setTimeout(detect, 300)
})
let detect = (cycle) => {
	let newBrightness = parseInt(fs.readFileSync(config.brightnessFile, "utf8"))
	if (newBrightness !== brightness || cycle) {
		brightness = newBrightness

		let runAs = []

		if (config.runAsUid === null) {
			let whoResult = cp.spawnSync("who", {shell: true})
			let whoData = whoResult.stdout.toString("utf8").trim().replace(/\r/g, "")
			let whoLines = whoData.split(/\n+/)
			for (let whoLine of whoLines) {
				let whoParts = whoLine.split(/\s+/)
				let myUid = parseInt(cp.spawnSync("id", ["-u", whoParts[0]]).stdout.toString("utf8"))
				let myDisplay = whoParts[1]
				if (myUid > 0) {
					runAs.push({uid: myUid, display: myDisplay})
				}
			}
		}
		else {
			runAs.push({uid: config.runAsUid, display: display})
		}

		if (runAs.length < 1) {
			runAs.push({uid: uid, display: display})
		}

		let atBrightness = brightness / maxBrightness
		let bottomBrightness = atBrightness * config.bottomDisplayAdjustment
		atBrightness = atBrightness.toFixed(2)
		bottomBrightness = bottomBrightness.toFixed(2)

		for (let as of runAs) {
			let cmd = "/usr/bin/xrandr --output " + config.topDisplay + " --brightness " + atBrightness.toString()
			cp.spawnSync(cmd, {shell: true, uid: as.uid, env: {DISPLAY: as.display}})
			cmd = "/usr/bin/xrandr --output " + config.bottomDisplay + " --brightness " + bottomBrightness.toString()
			cp.spawnSync(cmd, {shell: true, uid: as.uid, env: {DISPLAY: as.display}})
		}
	}

	// For some reason, certain actions change the brightness to something it isn't
	// supposed to be, so every 3 seconds, reset the brightness
	if (cycle) {
		setTimeout(() => detect(true), 3000)
	}
}
detect(true)
