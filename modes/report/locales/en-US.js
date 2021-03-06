const plural = require("./practices/dummy-plural");
const percentage = require("./practices/percentage");
const truthy = require("./practices/truthy");
const replaceable = require("./practices/replaceable");
const list = require("./practices/list");
const emoji = require("../res/emoji");

module.exports = {
	header: {
		top: "Difference report",
		statistics: "Statistics",
		summary: "Summary",
		changes: "Changes"
	},
	strings: plural({
		one: "# string",
		other: "# strings"
	}),
	summary: {
		totalBefore: "Total before",
		totalAfter: "Total after",
		change: "Change",
		percentage: percentage(),
		changeArrow: truthy(_ => _ < 0, { isTrue: emoji.decrease, isFalse: emoji.increase }),
		changePercentage: replaceable("{arrow} {percentage}"),
		changeStr: replaceable("{change} ({percentage})"),
		emptyStrings: "Empty strings",
		emptyStringsChange: replaceable("{before} **→** {after}"),
		progress: "Progress",
		progressBefore: "Progress before",
		progressStr: replaceable("{progress} ({change})")
	},
	changes: {
		added: "Added",
		changed: "Changed",
		deleted: "Deleted",
		goTo: replaceable("([Go to →]({link}))"),
		additions: plural({
			one: "# addition",
			other: "# additions"
		}),
		changes: plural({
			one: "# change",
			other:" # changes"
		}),
		deletions: plural({
			one: "# deletion",
			other:"# deletions"
		}),
		original: "Original string",
		translation: "Translation",
		translationBefore: "Translation before",
		noTranslation: "no translation"
	},
	generator: {
		generatedBy: replaceable("Generated by {generator}. Author is [{author}]({authorLink}). Licensed under {license} and [available on {resource}]({link})."),
		generator: "Discord Translation Compare Utility",
		author: "Sasha Sorokin"
	},
	translationAcknowledge: {
		translationBy: replaceable("Translated by {authors} <3"),
		authors: list(
			[
				// Please, put your username and link here!
				{ username: "DaFri_Nochiterov", link: "https://github.com/DaFri-Nochiterov" }
			],
			_ => _.link != null ? `[${_.username}](${_.link})` : _.username,
			true // One line
		)
	}
};