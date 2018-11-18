module.exports = function truthy(predicate, args) {
	if (predicate == null) {
		predicate = (val) => Boolean(val);
	}

	if (args.isFalse == null && args.isTrue == null) {
		throw new Error("You should provide at least one value");
	}

	return (val) => {
		return predicate(val) ? args.isTrue : args.isFalse;
	};
}