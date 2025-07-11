A simple library to check if a value is what you expect it to be.

## Usage

### Install

Node:

```sh
npx jsr add @zarco/switcher
```

Deno:

```sh
import is from "jsr:@zarco/switcher"
```

### Usage

```ts
import * as is from "@zarco/switcher";

if (is.string("hello")) {
  // do something
}
```

## Usage

I want to assign a const, but the value can will depend on another variable value.

Example, `binomialName` has to be 'Felis catus' if `animal` is 'cat',

````typescript
import switcher from '@zarco/switcher'

const binomialName = switcher(animal, {
  'cat': 'Felis catus',
  'lion': 'Panthera leo',
  'dog': 'Canis familiaris'
})
````

It will however be

'Panthera leo' if `animal` is 'lion', and 'Canis familiar
'Canis familiaris' if `animal` is 'dog'.

## Defaults

What about a default value? You can use the `default` method to set a default
value if the value is not what you expect it to be.

```ts
import * as is from "@zarco/switcher";

const animal = 'platypus';

const binomialName = switcher(animal, {
  'cat': 'Felis catus',
  'lion': 'Panthera leo',
  'dog': 'Canis familiaris'
}).default('Uncataloged species');

```

## Non-keyable values

````
Not everything fits as an object key
.
You may want to pass a regex, a function, or even an array of values to check against.

You can do that by using the `switcher` function with a more complex structure.

You can define the switch as an array of **case functions** and values!

````
(These case functions must always return boolean)

````typescript
const binomialName = switcher(animal, [
    {
      case: (str: string) => str.includes('cat'),
      value: 'Felis catus'
    },
    {
      case: (str: string) => str.includes('lion'),
      value: 'Panthera leo'
    },
    {
      case: (str: string) => str.includes('dog'),
      value: 'Canis familiaris'
    }
  ], { default: 'Uncataloged species' })

````


More details about each method can be found in the
[API documentation](https://jsr.io/@zarco/switcher/doc).

## Contributing

If you would like to contribute to this package you can (and should)
[open an issue](https://github.com/felipezarco/switcher/issues/new) and/or submit
your own [pull request](https://github.com/felipezarco/switcher/compare).

Thanks for your interest in contributing to this repo!

## Author

[Luiz Felipe Zarco](https://github.com/felipezarco) (felipezarco@hotmail.com)

## License

This code is licensed under the
[MIT License](https://github.com/felipezarco/switcher/blob/main/LICENSE). See the
[LICENSE](https://github.com/felipezarco/switcher/blob/main/LICENSE) file for more
info.