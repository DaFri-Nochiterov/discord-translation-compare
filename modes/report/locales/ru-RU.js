const plural = require("./practices/plural")("ru");
const percentage = require("./practices/percentage");
const truthy = require("./practices/truthy");
const replaceable = require("./practices/replaceable");
const list = require("./practices/list");
const emoji = require("../res/emoji");

module.exports = {
	header: {
		top: "Отчёт разницы",
		statistics: "Статистика",
		summary: "Сводка",
		changes: "Изменения"
	},
	strings: plural({
		one: "# строка",
		many: "# строк",
		other: "# строки"
	}),
	summary: {
		totalBefore: "Всего до",
		totalAfter: "Всего после",
		change: "Разница",
		percentage: percentage(),
		changeArrow: truthy(_ => _ < 0, { isTrue: emoji.decrease, isFalse: emoji.increase }),
		changePercentage: replaceable("{arrow} {percentage}"),
		changeStr: replaceable("{change} ({percentage})"),
		emptyStrings: "Без перевода",
		emptyStringsChange: replaceable("{before} **→** {after}"),
		progress: "Прогресс перевода",
		progressBefore: "Прогресс до этого",
		progressStr: replaceable("{progress} ({change})")
	},
	changes: {
		added: "Добавлено",
		changed: "Изменено",
		deleted: "Удалено",
		goTo: replaceable("([Перейти →]({link}))"),
		additions: plural({
			one: "# добавление",
			many: "# добавлений",
			other: "# добавления"
		}),
		changes: plural({
			one: "# изменение",
			many: "# изменений",
			other:" # изменения"
		}),
		deletions: plural({
			one: "# удаление",
			many: "# удалений",
			other: "# удаления"
		}),
		original: "Оригинальная строка",
		translation: "Перевод",
		translationBefore: "Прошлый перевод",
		noTranslation: "отсутствует"
	},
	generator: {
		generatedBy: replaceable("Сгенерировано {generator}. Автор — [{author}]({authorLink}). Исходный код распространяется под лицензией {license} и [доступен на {resource}]({link})."),
		generator: "утилитой сравнения версий переводов Discord",
		author: "DaFri_Nochiterov"
	},
	translationAcknowledge: {
		translationBy: replaceable("Перевод выполнен: {authors} <3"),
		authors: list(
			[
				// Please, put your username and link here!
				{ username: "DaFri_Nochiterov", link: "https://github.com/DaFri-Nochiterov" }
			],
			_ => _.link != null ? `[${_.username}](${_.link})` : _.username,
			true // One line
		)
	}
};