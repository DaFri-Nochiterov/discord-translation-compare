const diff = require("diff");
const escapeMarkdown = require("./escape-markdown");

const HIGHLIGHT_DISPLAY_REMOVALS = process.env["HIGHLIGHT_DISPLAY_REMOVALS"] === "true";

const HIGHLIGHT_START_POSSIBLE_REG = /^[A-ZА-Я]/i;
const HIGHLIGHT_END_POSSIBLE_REG = /[^ ]$/i;

const ZWSP = "\u200B";

module.exports = function highlightChanges(before, after, reverse) {
	if (reverse) { [before, after] = [after, before]; }

	const differences = diff.diffWords(before, after);

	let str = "";

	for (let i = 0, l = differences.length; i < l; i++) {
		const difference = differences[i];

		if (difference.removed) {
			if (HIGHLIGHT_DISPLAY_REMOVALS && !reverse) {
				str += `~~${escapeMarkdown(difference.value)}~~`;
			}

			continue;
		} else if (difference.added) {
			if (!HIGHLIGHT_START_POSSIBLE_REG.test(difference.value)) {
				difference.value = `${ZWSP}${difference.value}`;
			}

			if (!HIGHLIGHT_END_POSSIBLE_REG.test(difference.value)) {
				difference.value = `${difference.value}${ZWSP}`;
			}

			str += `**${escapeMarkdown(difference.value)}**`;

			continue;
		}

		str += escapeMarkdown(difference.value);
	}

	return str;
}