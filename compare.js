const path = require("path");

module.exports = function compare() {
	let beforeFilePath;
	let afterFilePath;
	let originalFilePath;

	{
		const args = process.argv;

		function tryAs(val, arg) {
			arg = `--${arg}=`;
			if (val.startsWith(arg)) {
				return val.slice(arg.length);
			}
		}

		for (let i = 0, l = args.length; i < l; i++) {
			const arg = args[i];

			let isBefore = tryAs(arg, "before");
			if (isBefore) {
				beforeFilePath = isBefore;
				continue;
			}

			let isAfter = tryAs(arg, "after");
			if (isAfter) {
				afterFilePath = isAfter;
				continue;
			}

			let isOriginal = tryAs(arg, "original");
			if (isOriginal) {
				originalFilePath = isOriginal;
				continue;
			}
		}
	}

	let beforeContent;
	let afterContent;
	let originalContent;

	{
		function loadFile(file) {
			return require(
				path.join(
					process.cwd(),
					file
				)
			);
		}

		beforeContent = loadFile(beforeFilePath);

		afterContent = loadFile(afterFilePath);

		originalContent = originalFilePath ? loadFile(originalFilePath) : null;
	}

	{

		let totalKeys = [];

		let beforeKeys = [];
		let afterKeys = [];

		{
			function addKeysFrom(content, keys, predicate) {
				let usePredicate = predicate != null;

				for (let key in content) {
					if (usePredicate && !predicate(key)) {
						continue;
					}

					keys.push(key);
				}
			}

			if (originalContent != null) {
				addKeysFrom(originalContent, totalKeys);
			} else {
				addKeysFrom(afterContent, totalKeys);
			}

			addKeysFrom(afterContent, totalKeys, key => !totalKeys.includes(key));

			addKeysFrom(beforeContent, beforeKeys);
			addKeysFrom(afterContent, afterKeys);
		}

		let added = [];
		let changed = [];
		let deleted = [];

		let emptyAfter = [];
		let emptyBefore = [];

		{
			let originalAvailable = originalContent != null;

			function getPayload(key, content, addition) {
				const payload = { key, content };

				if (originalAvailable) {
					const original = originalContent[key];

					if (original) payload.original = original;
				};

				if (addition != null) {
					for (let key in addition) {
						payload[key] = addition[key];
					}
				}

				return payload;
			}

			for (let i = 0, l = totalKeys.length; i < l; i++) {
				const key = totalKeys[i];

				const beenBefore = beforeKeys.includes(key);
				const hereAfter = afterKeys.includes(key);

				const valueAfter = afterContent[key];
				const valueBefore = beforeContent[key];

				if (!beenBefore && hereAfter) {
					added.push(
						getPayload(key, valueAfter)
					);
				} else if (beenBefore && !hereAfter) {
					deleted.push(
						getPayload(key, valueBefore)
					);
				} else if (beenBefore && hereAfter) {
					if (valueBefore !== valueAfter) {
						changed.push(
							getPayload(
								key,
								valueAfter,
								{ before: valueBefore }
							)
						);
					}
				}

				if (beenBefore) {
					if (valueBefore.length === 0) {
						emptyBefore.push(
							getPayload(
								key,
								valueBefore,
								valueAfter && { after: valueAfter }
							)
						);
					}
				}

				if (hereAfter) {
					if (valueAfter.length === 0) {
						emptyAfter.push(
							getPayload(
								key,
								valueAfter,
								valueBefore && { before: valueBefore }
							)
						);
					}
				}
			}
		}

		const totalBefore = beforeKeys.length;
		const totalAfter = afterKeys.length;

		let change;
		let difference;

		{
			const avg = (totalAfter + totalBefore) / 2;
			change = totalAfter - totalBefore;
			difference = 100 * (change / avg);
		}

		return {
			added,
			changed,
			deleted,
			emptyBefore,
			emptyAfter,
			totalBefore,
			totalAfter,
			change,
			difference
		};
	}
}