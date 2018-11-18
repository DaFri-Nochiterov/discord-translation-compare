const compare = require("../compare");

const result = compare();

console.log(`## Summary`);
console.log(`Total before: ${result.totalBefore} strings`);
console.log(`Total after: ${result.totalAfter} strings`);
console.log(`Change: ${result.change} strings (${result.change < 0 ? "↓" : "↑"} ${Math.abs(result.difference).toFixed(2)}%)`);

console.log(`\n## Changes`);
console.log(`Added: ${result.added.length} strings`);
console.log(`Changed: ${result.changed.length} strings`);
console.log(`Deleted: ${result.deleted.length} strings`);

console.log(`\n## Progress`);

const translated = result.totalAfter - result.emptyAfter.length;
const translatedBefore = result.totalBefore - result.emptyBefore.length;

const translatedPercentage = 100 * (translated / result.totalAfter);
const translatedBeforePercentage = 100 * (translatedBefore / result.totalBefore);

const progressChange = translatedPercentage - translatedBeforePercentage;

console.log(`Progress: ${translated} / ${result.totalAfter} - ${translatedPercentage.toFixed(2)}% (${progressChange < 0 ? "↓" : "↑"} ${Math.abs(progressChange).toFixed(2)}%)`);
console.log(`Progress before: ${translatedBefore} / ${result.totalBefore} - ${translatedBeforePercentage.toFixed(2)}%`);