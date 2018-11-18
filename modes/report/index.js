const generate = require("./generator");
const fs = require("fs");
const path = require("path");

const output = generate();

fs.writeFileSync(
	path.join(process.cwd(), `report-${Date.now()}.md`),
	output,
	{ encoding: "utf8" }
);