![OkJS](./icon/logo.png)

# OkJS

> A super tiny JavaScript library for form validation

## Introduction

Ok is an very small utility library to validate forms with more than what HTML5 offers you. Features include customized messages and validator chaining.

## Usage

Ok can be installed from the npm registry:

```shell
npm install okjs --save
```

### Syntax

```js
/**
 * Create Ok instance with custom validators
 */
const ok = new Ok({
    nameFirst: {
        msg: "only 'Dave' allowed",
        fn: val => val === "Dave"
    },
    emailDe: {
        msg: "Please input your .de email",
        fn: (fn, element) => val.endsWith(".de")
    }
});

/**
 * Bind validation event handlers to inputs
 */
ok.bind(document.querySelector("#inputNameFirst"));
ok.bind(document.querySelector("#inputMail"));
```

The validator which will be used is defined in the DOM via data-attributes:

```html
<form class="form">
    <div>
        <label>First Name (only "Dave" allowed)</label>
        <input type="text" required data-ok="nameFirst">
    </div>
    <div>
        <label>Last Name (not validated, anything goes)</label>
        <input type="text" required>
    </div>
    <div>
        <label>Email address (only ".de" allowed)</label>
        <input type="email" required data-ok="emailDe">
    </div>
    <input type="submit">
</form>
```

the name defined in `data-ok` is the key of the methods object defined in the JS.
if the given fn evaluates to false, the input will be marked as invalid.

### Validation

Once the user inputs on a field bound by Ok.js, the validator function will be run. If it evaluates to true, the field is valid.
If it evaluates falsy, the field will be marked as invalid with the class "invalid" and the JS validity will be updated (which will show a popup containing the validator message, based on the browser).

### Chaining

Multiple validators can be used for a single field in a given order by chaining them. to chain multiple validators, simply add a comma between their keys in the ok attribute. When using chaining, the field will only be considered valid if all validators succeed.

```html
<div class="form-group">
    <label for="exampleInputEmail">Email ID (all caps and ending in .de)</label>
    <input type="email" required data-ok="nameCaps, emailDe">
</div>
```

```js
const ok = new Ok({
    nameCaps: {
        msg: "Must be in all caps",
        fn: val => val.toUpperCase() === val
    },
    emailDe: {
        msg: "Must end with '.de'",
        fn: val => /.+\.de$/i.test(val)
    }
});
```

## Options

Ok currently only has one option, the class to use for invalid elements.

```js
// The default invalid class('invalid') will be used
new Ok({});

// 'myClass' will be used for invalid fields
new Ok({}, "myClass");

// no class will be used for invalid fields
new Ok({}, false);
```

## Legacy Browsers

For browsers not supporting the HTML5 Validation API (<https://caniuse.com/#feat=form-validation>), ok.js will still work, but the validation message will not be shown.
