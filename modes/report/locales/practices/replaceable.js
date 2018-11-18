module.exports = function replaceable(str) {
	return (args) => {
		let _ = str;

		for (let arg in args) {
			_ = _.replace(`{${arg}}`, args[arg]);
		}

		return _;
	};
}