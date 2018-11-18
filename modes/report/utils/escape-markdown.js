// Author: edwmurph <https://github.com/edwmurph>
// Repository: GitHub <https://github.com/edwmurph/escape-markdown>
// License: unknown
// Modified-By: DaFri_Nochiterov <https://github.com/DaFri-Nochiterov>

const map = {
	"*": "\\*",
	"#": "\\#",
	"(": "\\(",
	// ")": "\\)",
	"[": "\\[",
	"]": "\\]",
	_: "\\_",
	"\\": "\\\\",
	"+": "\\+",
	"-": "\\-",
	"`": "\\`",
	"<": "&lt;",
	">": "&gt;",
	"&": "&amp;"
};

module.exports = function escapeMarkdown(string) {
	return string.replace(/[\*\(\)\[\]\+\-\\_`#<>]/g, m => map[m] || m)
};