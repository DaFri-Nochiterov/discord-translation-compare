# Discord Translation Comparison Utility

This utility compares two versions of localization files and returns specified file. It can generate a markdown report or simply create you a JSON file. This is only alpha version and may work not as expected, but it does the thing pretty well already.

This will be useful to former proofreaders and those smart buddies who watch the translation after the Discord abandoned community translation project in favor of vendor translations.

## How do I use it?

You need to obtain localization files, one older and the second is current one. You also may obtain original localization file to see original strings in reports.

To get localization files you can use my other utility called [Discord Translation Extractor](https://github.com/DaFri-Nochiterov/discord-translation-extractor), it contains instructions on localization files extraction.

### Requirements

- Same as with extractor you need to have [Node.js](https://nodejs.org/) installed, latest version is recommended
- Install dependencies using the `npm i` (this is not required if you are not using `report` mode)

### Running the monster

1. Put localization files somewhere, for example in `src` directory

2. Run the script for wanted mode. The package comes with three modes for library:

  - `modes/make-json` will run the library and dump the result into the JSON file in the working directory
  - `modes/stats` will run the library and output some stats into console
  - `modes/report` will generate a markdown report (if there are many differences, this report may be huge, beware 😄)

  All of the modes above accept the arguments library does:

  - `--before=[filename]` (`string`) that specifies location for the old file
  - `--after=[filename]` (`string`) specifies location of new file
  - `--original=[filename]` (**optional**, `string`) specifies location to the original localization file

  Additionaly, `report` mode accepts the following environment variables:

  - `REPORT_LOCALE` (**optional**, `string`) which specified locale to use (locales are loaded from `modes/report/locales` directory)
  - `HIGHLIGHT_DISPLAY_REMOVALS` (**optional**, `boolean`) if set to true, will display removals in report using the strikethrough effect (example: ~~bye~~**hello** world)

  If you are running the other locale for `report` mode, ensure you have `full-icu` installed and specified the it after `node` command (not after the script filename) using the argument `--icu-data-dir`.

  You also can make your own script using the library in the root directory — `compare.json`.

  So your command may look like this:

  ```bash
  node --icu-data-dir=node_modules/full-icu ./modes/report --before=./src/OLD_CLIENT_RU.json --after=./src/CURRENT_CLIENT_RU.json --original=./src/CURRENT_ORIGINAL.json
  ```
3. Get the results

  For `stats` mode, the results show in the console. In opposite, `report` and `make-json` create files in the working directory (where you ran the command):

  - `reports-[unix timestamp].md`
  - `result-[unix timestamp].json`

