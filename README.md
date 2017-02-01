![OkJS](./logo.png)

# OkJS

> A super tiny JavaScript library for form validation

## Introduction

Ok is an utility library to validate forms that require more validation than what HTML5 supports.

## Usage

Ok can be installed from the npm registry:

```shell
npm install okjs --save
```

```shell
yarn add okjs
```

## Syntax

Calling Ok after the DOM has loaded will bind the validator to all given input nodes with the `data-ok` sttribute

```js
//Ok({el,methods,timeout,invalidClass})
Ok({
    el: ".form",
    methods: {
        nameCaps: val => {
            return val.split("").every(letter => letter === letter.toUpperCase());
        },
        emailDe: val => {
            return val.endsWith(".de");
        }
    }
});
```

- `el`: contains the selector for all forms of which the inputs should be checked
- `methods`: object with all custom validator functions
- `timeout` (optional): custom timeout to use between input events, default: `20`
- `invalidClass` (optional): custom class to use on invalid inputs, default: `"invalid"`

The validator which will be used on inputs is defined in the dom via data-attributes:

```html
<form class="form">
    <input type="text" placeholder="Enter Name" data-ok="nameCaps">
    <input type="email" placeholder="Enter email" data-ok="emailDe">
</form>
```

the name defined in `data-ok` is the key of the methods object defined in the js.
if `nameCaps(val)` evaluates to false, the text-input will be marked as invalid, otherwise it will be un-marked
