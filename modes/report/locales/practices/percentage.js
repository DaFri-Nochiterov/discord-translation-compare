// TODO: Use Intl.NumberFormat

module.exports = function percentage() {
	return (val) => {
		return `${val.toFixed(2)}%`;
	};
}