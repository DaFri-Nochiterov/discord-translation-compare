# How to contribute

## What do I do?

### 🐞 Found a bug?

If you had found the bug, please file a report in the [Issues section](/issues/) of the repository.

### 🌐 Want to localize reports?

You can contribute a localization file for reports via Pull Request.

Localization files are located in `modes/report/locales` directory, the names are IETF language tags (language (2 letters) + `-` + country (2 letters)) with following `.js` after it.

Here are some examples:

- `ru-RU` — Russian (Russia)
- `fr-FR` — French (France)
- `de-DE` — German (Germany)

Find more about the IETF language tags [here](https://www.w3.org/International/articles/language-tags/).

There are some [“practices” available](/docs/LOCALIZATION_PRACTICES.md) to help you with localization file.

When localizing, be sure to look at the [English localization file](/modes/report/locales/en-US.js).

## Submitting Pull Request

### First to Open Source?

If you are new to open source, there a lot of guides how to start and contibute your changes!

I would recommend you read the following:

- [How To Create a Pull Request on GitHub](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github) by DigitalOcean
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/) in Open Source Guides by GitHub

They guide you how to submit a pull request and I'm here to help.

### Code Styles

- If your Code Editor does not support EditorConfig natively, install styles on your own.

- We are using Tabs (`\t`) for JS and JSON, so you can tell your editor to use any size you want.

- For markdown files 2 Spaces is used.

- Be sure to write modern JS code, but don't forget about the performance.

- No linter is configured… yet?