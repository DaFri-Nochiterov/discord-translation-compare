const DEFAULT_BULLET_MULTILINE = "* ";
const DEFAULT_BULLET_SINGLELINE = " ";

const DEFAULT_SEPARATOR_SINGLELINE = ",";
const DEFAULT_SEPARATOR_MULTILINE = "\n";

module.exports = function list(list, converter, oneLine, bullet, separator) {
	if (separator == null) {
		separator = oneLine
			? DEFAULT_SEPARATOR_SINGLELINE
			: DEFAULT_SEPARATOR_MULTILINE;
	}

	if (bullet == null) {
		bullet = oneLine
			? DEFAULT_BULLET_SINGLELINE
			: DEFAULT_BULLET_MULTILINE;
	}

	let str = "";

	for (let i = 0, l = list.length; i < l; i++) {
		if (i !== 0) str += bullet;

		if (converter) str += converter(list[i]);
		else str += list[i];

		if (i !== (l - 1)) str += separator;
	}

	return str;
}