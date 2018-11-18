module.exports = function dummySlug(str) {
	return `#${str.toLowerCase().replace(/ /g, "-")}`;
}