const compare = require("../compare");
const fs = require("fs");
const path = require("path");

const result = compare();

fs.writeFileSync(
	path.join(process.cwd(), `result-${Date.now()}.json`),
	JSON.stringify(result, null, "\t"),
	{ encoding: "utf8" }
);