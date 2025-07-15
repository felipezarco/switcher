[![JSR Score](https://jsr.io/badges/@zarco/switcher/score)](https://jsr.io/@zarco/switcher)
[![JSR](https://jsr.io/badges/@zarco/switcher)](https://jsr.io/@zarco/switcher)
[![JSR Scope](https://jsr.io/badges/@zarco)](https://jsr.io/@zarco)

I want to assign a **const**, but **its value depends on another variable**.

[switcher](https://jsr.io/@zarco/switcher) is a simple way to conditionally
assign a constant value. A cleaner alternative to switch statements with IIFE
wrappers.

## Install

Node:

```sh
npx jsr add @zarco/switcher
```

Then, import it:

```ts
import switcher from "@zarco/switcher";
```

Or with Deno:

```ts
import switcher from "jsr:@zarco/switcher";
```

## Usage

#### Example 1

I want `databaseName` to be conditioned by `process.env.NAME`.

```typescript
const databaseName = switcher(process.env.NAME, {
  local: "LOCAL_DATABASE",
  development: "DEVELOPMENT_DATABASE",
  staging: "STAGING_DATABASE",
  production: "PRODUCTION_DATABASE",
});

console.log(process.env.NAME); // "production"
console.log(databaseName); // "PRODUCTION_DATABASE"
```

> When `process.env.NAME` is "production", `databaseName` is set to
> "PRODUCTION_DATABASE".

#### Example 2

```typescript
import switcher from "@zarco/switcher";

const animal = "lion";

const binomialName = switcher(animal, {
  "cat": "Felis catus",
  "lion": "Panthera leo",
  "dog": "Canis familiaris",
});

console.log(binomialName); // Output: Panthera leo
```

> The constant binomialName is set to "Felis catus" if animal is "cat",
> "Panthera leo" if it's "lion", and "Canis familiaris" if it's "dog".

## Defaults

_What about a default value?_

You can use the `default` option to set a default.

```ts
import switcher from "@zarco/switcher";

const animal = "platypus";

const binomialName = switcher(animal, {
  "cat": "Felis catus",
  "lion": "Panthera leo",
  "dog": "Canis familiaris",
}, {
  default: "Uncataloged species",
});
```

## Non-keyable values

_Not everything fits in an object key!_

You may want to use a regex or a custom function as a condition.

You can achieve that by using `switcher` with a more complex structure.

You can define the second argument as an **array of case functions** and values
instead of an object!

```typescript
const binomialName = switcher(animal, [
  {
    case: (str: string) => str.includes("cat"),
    value: "Felis catus",
  },
  {
    case: (str: string) => str.includes("lion"),
    value: "Panthera leo",
  },
  {
    case: (str: string) => str.includes("dog"),
    value: "Canis familiaris",
  },
], { default: "Uncataloged species" });
```

> Note: each case function should return a **boolean**.

More details about each method can be found at the
[API documentation](https://jsr.io/@zarco/switcher/doc).

## Contributing

If you would like to contribute to this package you can (and should)
[open an issue](https://github.com/felipezarco/switcher/issues/new) and/or
submit your own [pull request](https://github.com/felipezarco/switcher/compare).

Thanks for your interest in contributing to this repo!

If not, give it a star ⭐ at [github](https://github.com/felipezarco/switcher)!

## Author

[Luiz Felipe Zarco](https://github.com/felipezarco) (felipezarco@hotmail.com)

## License

This code is licensed under the
[MIT License](https://github.com/felipezarco/switcher/blob/main/LICENSE). See
the [LICENSE](https://github.com/felipezarco/switcher/blob/main/LICENSE) file
for more info.
