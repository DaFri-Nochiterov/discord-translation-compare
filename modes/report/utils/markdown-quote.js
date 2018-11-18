module.exports = function quote(str) {
	const lines = str.split("\n");

	let result = "";

	for (let i = 0, l = lines.length; i < l; i++) {
		result += `> ${lines[i]}`;
		if (i != (l - 1)) result += "\n>\n";
	}

	return result;
}