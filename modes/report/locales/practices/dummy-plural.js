module.exports = function dummyPlural(args) {
	function select(val) {
		return Math.abs(val >> 0) === 1 ? "one" : "many";
	}

	if (args.other == null) {
		throw new Error("`other` must be provided");
	}

	return (val) => {
		const selection = select(val);

		return (args[selection] || args.other).replace("#", val);
	};
};