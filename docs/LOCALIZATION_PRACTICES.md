# Localization Practices

I've made it simple to create localizations. There a few things that will make your suffer a little easier:

## Available practices

### Plurals

First of all, plural function must be defined at the top of file like this:

```js
const plural = require("./practices/plural")("ru");
```

Above, you may notice I used `"ru"`, you need to use your language tag, you may include country too if you think it is necessary. The plural rules loaded from the ICU Data file, so they should be up-to-date.

Then, in the code, you may create plurals as following:

```js
module.exports = {
  … // other strings
  additions: plural({
    one: "# добавление", // 1 addition
    many: "# добавлений", // 5 additions
    other: "# добавления" // 2 additions
  }),
  …
};
```

Arguments may differ based on language, `other` is required and will be used if no required argument found. `#` will be replaced with the number.

### Replaceable

Replaceable are the string that contain pieces that could be replaced.

They are defined on top as following:

```js
const replaceable = require("./practices/replaceable");
```

And used like this:

```js
module.exports = {
  …,
  changePercentage: replaceable("{arrow} {percentage}"),
  …
};
```

In this string, there are two things that could be replaced — `{arrow}` and `{percentage}`. So if generator will pass the following values:

```js
{ arrow: "↑",
  percentage: "12.36%" }
```

The function will return string `"↑ 12.36%"`.

### Truthy

Truthy returns a value based on the condition.

Definition:

```js
const truthy = require("./practices/truthy");
```

Usage:

```js
module.exports = {
  …,
  changeArrow: truthy(_ => _ < 0, { isTrue: "↓", isFalse: "↑" }),
  …
};
```

Here we check if passed value (argument `_`) is less than zero (`_ < 0`). Next, if it's true, we'll return string `"↓"`, otherwise `"↑"` will be returned.

### Percentage

This is a dummy one (which means it doesn't accept any arguments and just returns what passed with some modifications). The all this function does is converting passed number to percentage (26.31 → `26.31%`)

Definition:

```js
const percentage = require("./practices/percentage");
```

Usage:

```js
module.exports = {
  …,
  percentage: percentage(),
  …
};
```

### List

This one is pretty smart function and only used in localization file to list all of contributors. It accepts few arguments as configuration and returns the string based on it.

Definition:

```js
const list = require("./practices/list");
```

Usage:

`list(array, converter?, oneLine?, bullet?, separator?)`

- `array`: list of items (`["a", "b", "c"]` for example)
- `converter` (**optional**): a function that converts passed item to string
- `oneLine` (**optional**): boolean (true/false) value which says if the list is display in one line (`a, b, c`) or in multiple lines (1 item per line)
- `bullet` (**optional**): bullet point, used at the start of list (by default is `" "` for sigle line lists and `"* "` for multiline)
- `separator` (**optional**): separator between the items (by default is `", "` for single line lists and `"* "` for multiline)

```js
module.exports = {
  …,
  authors: list(
    [
      { username: "Sasha Sorokin", link: "https://twitter.com/sanya__sorokin" },
      { username: "Example username" },
      { username: "UwU", link: "https://github.com/owo-watsdis" }
    ],
    contributor => contributor.link != null ? `[${contributor.username}](${contributor.link})` : contributor.username,
    true // One line
  ),
  …
};
```

Explaining the above, first of all, we pass the list of contributors. It's a list of objects (`{}`) with properties `username` and `link` defined. The link is optional, so in the converter (function which converts item from the array to the list one) we check if contributor object (argument `_`) has the property `link` and if yes, we return the template string `` `[${contributor.username}](${contributor.link})` `` (here, inside `${}`, are the code that will be executed in runtime, so `${contributor.username}` will be replaced with `Sasha Sorokin`, for example).

---

## That's all!

Above the all practices we have available for now with the explanations. Good luck with using them if you are doing the localization.

You can also use them in your own projects, remember — this project is open source and you may use any parts of code under the license! The practices source codes in `modes/report/locales/practices` directory 👍
