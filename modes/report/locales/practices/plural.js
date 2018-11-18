module.exports = function forLanguage(lang, opts) {
	const pluralRules = new Intl.PluralRules(lang, opts);

	return function plural(args) {
		if (args.other == null) {
			throw new Error("`other` must be provided");
		}

		return (val) => {
			const selection = pluralRules.select(val);

			return (args[selection] || args.other).replace("#", val);
		};
	}
};