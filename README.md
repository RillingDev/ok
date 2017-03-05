![OkJS](./logo.png)

# OkJS

> A super tiny JavaScript library for form validation

## Introduction

Ok is an very small (0.4kB) utility library to validate forms with more than what HTML5 supports.

## Usage

Ok can be installed from the npm registry:

```shell
npm install okjs --save
```

```shell
yarn add okjs
```

## Syntax

### Setup

Calling Ok after the DOM has loaded will bind the validator to all given input elements with the `data-ok` attribute

```js
//Ok({el,validators})
Ok({
    el: ".form",
    validators: {
        nameCaps: {
            msg: "Please input your name in caps",
            fn: val => {
                return val.toUpperCase() === val;
            }
        },
        emailDe: {
            msg: "Please input your .de email",
            fn: (val, e) => {
                return val.endsWith(".de");
            }
        }
    }
});
```

- `el`: contains the selector for all forms of which the inputs should be checked
- `validators`: object with all custom validator functions

The validator which will be used on inputs is defined in the dom via data-attributes:

```html
<form class="form">
    <input type="text" placeholder="Enter Name" data-ok="nameCaps">
    <input type="email" placeholder="Enter email" required data-ok="emailDe">
    <input type="submit" >
</form>
```

the name defined in `data-ok` is the key of the methods object defined in the js.
if `nameCaps(val)` evaluates to false, the text-input will be marked as invalid, otherwise it will be un-marked

### Validation

Once the user inputs on a field bound by Ok.js, the validator function will be run. If it evaluates to true, the field is valid.
If it evaluates falsy, the field will be marked as invalid with the class "invalid" and the JS validity will be updated (which will show a popup containing the validator message).

## Compability

Safari: Older versions of Safari expirience issues for html5 validation. Polyfilling that might make it compatible
