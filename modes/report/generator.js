const compare = require("../../compare");
const highlightDifference = require("./utils/highlight-difference");
const markdownQuote = require("./utils/markdown-quote");
const escapeMarkdown = require("./utils/escape-markdown");
const dummySlug = require("./utils/dummy-slug");
const emoji = require("./res/emoji");

const result = compare();

const AUTHOR_LINK = "https://github.com/DaFri-Nochiterov";
const SOURCE_CODE = ["GitHub", "https://github.com/DaFri-Nochiterov/discord-translation-compare", "MIT"];

module.exports = function generate() {
	const locale = (() => {
		let env = process.env["REPORT_LOCALE"];
		if (env == null) { env = "en-US"; }

		try {
			return require(`./locales/${env}.js`);
		} catch (err) {
			console.warn("failed to load locale", err);
			if (env === "en-US") return process.exit(1);
		}

		console.warn("fallback to english language");

		return require("./locales/en-US.js");
	})();

	let report = `# ${locale.header.top}\n`;

	report += `\n## ${emoji.statistics} ${locale.header.statistics}\n`;
	report += `\n### ${locale.header.summary}\n`;

	const strPlural = locale.strings;

	report += `\n**${locale.summary.totalBefore}**: ${strPlural(result.totalBefore)}\n`;
	report += `\n**${locale.summary.totalAfter}**: ${strPlural(result.totalAfter)}\n`;

	report += `\n**${locale.summary.change}**:`;

	report += ` ${
		locale.summary.changeStr({
			change: strPlural(result.change),
			percentage: locale.summary.changePercentage({
				arrow: locale.summary.changeArrow(result.change),
				percentage: locale.summary.percentage(Math.abs(result.difference))
			})
		})
	}\n`;

	report += `\n**${locale.summary.progress}**:`;

	{
		const translated = result.totalAfter - result.emptyAfter.length;
		const translatedBefore = result.totalBefore - result.emptyBefore.length;

		const translationProgress = 100 * (translated / result.totalAfter);
		const transaltionProgressBefore = 100 * (translatedBefore / result.totalBefore);

		const change = translationProgress - transaltionProgressBefore;

		report += ` ${
			locale.summary.progressStr({
				progress: locale.summary.percentage(translationProgress),
				change: locale.summary.changePercentage({
					arrow: locale.summary.changeArrow(change),
					percentage: locale.summary.percentage(change)
				})
			})
		}\n`;

		report += `\n**${locale.summary.progressBefore}**: ${locale.summary.percentage(transaltionProgressBefore)}\n`;
	}

	{
		const change = locale.summary.emptyStringsChange({
			before: result.emptyBefore.length,
			after: strPlural(result.emptyAfter.length)
		});

		report += `\n**${locale.summary.emptyStrings}**: ${change}\n`;
	}

	report += `\n## ${emoji.changes} ${locale.header.changes}\n`;

	const additions = result.added;
	const additionsCount = additions.length;
	const additionsHeader = locale.changes.additions(additionsCount);

	const deletions = result.deleted;
	const deletionsCount = deletions.length;
	const deletionsHeader = locale.changes.deletions(deletionsCount);

	const changes = result.changed;
	const changesCount = changes.length;
	const changesHeader = locale.changes.changes(changesCount);

	report += `\n**${locale.changes.added}**: ${strPlural(additionsCount)} ${locale.changes.goTo({ link: dummySlug(additionsHeader) })}\n`;
	report += `\n**${locale.changes.changed}**: ${strPlural(changesCount)} ${locale.changes.goTo({ link: dummySlug(changesHeader) })}\n`;
	report += `\n**${locale.changes.deleted}**: ${strPlural(deletionsCount)} ${locale.changes.goTo({ link: dummySlug(deletionsHeader) })}\n`;

	report += `\n### ${additionsHeader}\n`;

	for (let i = 0; i < additionsCount; i++) {
		const addition = additions[i];

		report += `\n#### \`${addition.key}\`\n`;

		if (addition.original != null) {
			report += `\n**${locale.changes.original}**:\n`;
			report += `\n${markdownQuote(escapeMarkdown(addition.original))}\n`;
		}

		report += `\n**${locale.changes.translation}**:\n`;

		report += addition.content !== ""
			? `\n${markdownQuote(escapeMarkdown(addition.content))}\n`
			: `*${locale.changes.noTranslation}*\n`;

		report += "\n---\n";
	}

	report += `\n### ${changesHeader}\n`;

	for (let i = 0; i < changesCount; i++) {
		const change = changes[i];

		report += `\n#### \`${change.key}\`\n`;

		report += `\n**${locale.changes.translation}**:\n`;

		report += change.content !== ""
			? change.before != null
				? `\n${markdownQuote(highlightDifference(change.before, change.content))}\n`
				: `\n${markdownQuote(escapeMarkdown(change.content))}\n`
			: `*${locale.changes.noTranslation}*\n`;

		if (change.before != null) {
			report += `\n**${locale.changes.translationBefore}**:\n`;

			report += change.content !== ""
				? `\n${markdownQuote(highlightDifference(change.before, change.content, true))}\n`
				: `\n${markdownQuote(escapeMarkdown(change.before))}\n`;
		}

		if (change.original != null) {
			report += `\n**${locale.changes.original}**:\n`;

			report += `\n${markdownQuote(escapeMarkdown(change.original))}\n`;
		}

		report += `\n---\n`;
	}

	report += `\n### ${deletionsHeader}`;

	for (let i = 0; i < deletionsCount; i++) {
		const deletion = deletions[i];

		report += `\n#### \`${deletion.key}\`\n`;

		report += `\n${markdownQuote(escapeMarkdown(deletion.content))}\n`;
	}

	report += `\n---\n`;

	report += `\n${
		locale.generator.generatedBy({
			generator: locale.generator.generator,
			author: locale.generator.author,
			authorLink: AUTHOR_LINK,
			license: SOURCE_CODE[2],
			resource: SOURCE_CODE[0],
			link: SOURCE_CODE[1],
		})
	}\n`;

	if (locale.translationAcknowledge != null) {
		report += `\n${
			locale.translationAcknowledge.translationBy({
				authors: locale.translationAcknowledge.authors
			})
		}\n`;
	}

	return report;
}