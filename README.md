![OkJS](./logo.png)

# OkJS

> A super tiny JavaScript library for form validation

## Introduction

Ok is an very small (500 byte) utility library to validate forms with more than what HTML5 offers you.

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
    "name-first": {
        msg: "only 'Dave' allowed",
        fn: val => val === "Dave"
    },
    "email-de": {
        msg: "Please input your .de email",
        fn: val => val.endsWith(".de")
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
        <label for="inputNameFirst">First Name (only "Dave" allowed)</label>
        <input type="text" id="inputNameFirst" placeholder="Enter First Name" required data-ok="name-first">
    </div>
    <div>
        <label for="inputNameLast">Last Name (not validated, anything goes)</label>
        <input type="text" id="inputNameLast" placeholder="Enter Last Name" required>
    </div>
    <div>
        <label for="inputMail">Email address (only ".de" allowed)</label>
        <input type="email" id="inputMail" placeholder="Enter email" required data-ok="email-de">
    </div>
    <input type="submit">
</form>
```

the name defined in `data-ok` is the key of the methods object defined in the JS.
if `name-caps(val)` evaluates to false, the text-input will be marked as invalid, otherwise it will be un-marked

### Validation

Once the user inputs on a field bound by Ok.js, the validator function will be run. If it evaluates to true, the field is valid.
If it evaluates falsy, the field will be marked as invalid with the class "invalid" and the JS validity will be updated (which will show a popup containing the validator message, based on the browser).
