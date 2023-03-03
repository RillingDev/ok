# Ok.js

> A tiny JavaScript library for form validation.

## Introduction

Ok.js is a utility library to validate forms with more than what HTML5 offers you. Features include customized messages and validator chaining.

[Documentation](https://felixrilling.github.io/ok/)

## Usage

```shell
npm install okjs --save
```

### Data-Attribute API

The data-attribute API works well when working directly with HTML that is enhanced by JS.

```typescript
import {Ok} from "okjs";

/**
 * Create Ok instance with custom validators
 */
const ok = new Ok({
	nameFirst: {
		msg: "Only 'Dave' allowed",
		fn: (element) => element.value === "Dave",
	},
	emailDe: {
		msg: (element) =>
			`Please input your .de email (You entered '${element.value}')`,
		fn: (element) => element.value.endsWith(".de"),
	},
});

/**
 * Bind validation event handlers to inputs
 */
document.querySelectorAll("[data-ok]").forEach(el => {
	el.addEventListener("input", (e) => ok.validate(e.target));
})
```

The validator which will be used is defined in the DOM via data-attributes:

```html
<form class="form">
	<div>
		<label for="demo1_1">First Name (only "Dave" allowed)</label>
		<input id="demo1_1" type="text" required data-ok="nameFirst" />
	</div>
	<div>
		<label for="demo1_2">Last Name (not validated, anything goes)</label>
		<input id="demo1_2" type="text" required />
	</div>
	<div>
		<label for="demo1_3">Email address (only ".de" allowed)</label>
		<input id="demo1_3" type="email" required data-ok="emailDe" />
	</div>
	<input type="submit" />
</form>
```

The name defined in `data-ok` is the key of the validator dictionary object defined in the JavaScript Ok.js constructor parameter. If the given fn evaluates to false, the input will be marked as invalid.

#### Validation

Once the user inputs on a field bound by Ok.js, the validator function will be run. If it evaluates to true, the field is valid. If it evaluates to false, the field will be marked as invalid, and the input validity will be updated (which will show a popup containing the validator message, based on the browser).

#### Chaining

Multiple validators can be used for a single element in a given order by chaining them. To chain multiple validators, simply add a comma between their keys in the ok attribute. When using chaining, the field will only be considered valid if all validators succeed. Once a validator marks the field as invalid, all further validators are skipped.

```html
<label for="demo2_1">Email ID (all caps and ending in .de)</label>
<input id="demo2_1" type="email" required data-ok="nameCaps,emailDe"/>
```

```typescript
import { Ok } from "okjs";

const ok = new Ok({
	nameCaps: {
		msg: "Must be in all caps",
		fn: (element) => element.value.toUpperCase() === element.value,
	},
	emailDe: {
		msg: "Must end with '.de'",
		fn: (element) => /.+\.de$/i.test(element.value),
	},
});
```

### Composition API

The composition API works well if you already use a frontend framework like React or Vue, and do not want to use data attributes for logic.

```jsx
import {validate} from "okjs";

const nameFirst = {
    msg: "Only 'Dave' allowed",
    fn: (element) => element.value === "Dave",
};


const SomeComponent = () => {

    const handleInput = (e) => {
		validate(e.target, [nameFirst]);
    };

    return (
        <form>
            <label htmlFor="demo4_1">First Name (Only 'Dave' allowed)</label>
            <input type="text" onChange={handleInput} id="demo4_1"/>

            <input type="submit"/>
        </form>
    );
};

```

### Caveats

#### Radiobuttons

Due to the way input elements with type `radio` work, validation is not straightforward. A single radio button only fires its `change`/`input` event when itself is changed, not if it becomes e.g. inactive due to another radiobutton being selected. A workaround is using an enclosing fieldset and listening to the events of that.

## Compatibility

Ok.js should work in all browsers that support the following:

-   <https://caniuse.com/form-validation>
-   <https://caniuse.com/mdn-api_htmlinputelement_setcustomvalidity>
