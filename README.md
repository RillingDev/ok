# Ok.js

> A tiny JavaScript library for form validation.

## Introduction

Ok.js is a utility library to validate forms with more than what HTML5 offers you. Features include customized messages
and validator chaining.

[Documentation](https://rilling.dev.github.io/ok/)

## Usage

Install the package:

```shell
npm install okjs --save
```

### Choosing an API

Ok.js offers two different APIs to interact with it:

-   The data-attribute API works via HTML data-attributes and works well without any frontend
    framework.
-   The composition API uses a more functional approach and is useful when combined with a frontend framework such as Vue
    or React.

The two offer the same functionality, but depending on your use-case, one may be preferable.

### Data-Attribute API

The data-attribute API works well when working directly with HTML that is enhanced by JS.

```typescript
import { Ok } from "okjs";

/**
 * Create Ok instance with custom validators.
 */
const ok = new Ok({
	/**
	 * A validator with the name 'nameFirst'.
	 */
	nameFirst: {
		msg: "Only 'Dave' allowed",
		/**
		 * Validation passes if the element value is "Dave".
		 */
		fn: (element) => element.value === "Dave",
	},
	emailDe: {
		msg: (element) =>
			`Please input your .de email (You entered '${element.value}')`,
		fn: (element) => element.value.endsWith(".de"),
	},
});

/**
 * Bind validation event handlers to inputs.
 */
document.querySelectorAll("[data-ok]").forEach((el) => {
	el.addEventListener("input", (e) => ok.validate(e.target));
});
```

The validator which will be used is defined in the DOM via `data-ok` data-attributes:

```html
<form>
	<label for="demo1_1">First Name (only "Dave" allowed)</label>
	<input id="demo1_1" type="text" required data-ok="nameFirst" />

	<label for="demo1_2">Last Name (not validated, anything goes)</label>
	<input id="demo1_2" type="text" required />

	<label for="demo1_3">Email address (only ".de" allowed)</label>
	<input id="demo1_3" type="email" required data-ok="emailDe" />

	<input type="submit" />
</form>
```

The value defined in `data-ok` is the key of the validator dictionary object provided in the JavaScript Ok.js constructor
parameter.
If the given function evaluates to false, the input will be marked as invalid, and the message will be shown.

### Composition API

The composition API works well if you already use a frontend framework like React or Vue, and do not want to use data
attributes for logic.

Example using React:

```tsx
import { validate } from "okjs";

/**
 * A validator with the name 'nameFirst'.
 */
const nameFirst = {
	msg: "Only 'Dave' allowed",
	fn: (element) => element.value === "Dave",
};

const emailDe = {
	msg: (element) =>
		`Please input your .de email (You entered '${element.value}')`,
	fn: (element) => element.value.endsWith(".de"),
};

const SomeComponent = () => {
	const handleNameChange = (e) => {
		/**
		 * Trigger validation using the 'nameFirst' validator.
		 */
		validate(e.target, [nameFirst]);
	};
	const handleEmailChange = (e) => {
		validate(e.target, [emailDe]);
	};

	return (
		<form>
			<label htmlFor="demo2_1">First Name (Only 'Dave' allowed)</label>
			<input id="demo2_1" type="text" onChange={handleNameChange} />

			<label htmlFor="demo2_2">
				Last Name (not validated, anything goes)
			</label>
			<input id="demo2_2" type="text" required />

			<label htmlFor="demo2_3">Email address (only ".de" allowed)</label>
			<input
				id="demo2_3"
				type="email"
				required
				onChange={handleEmailChange}
			/>

			<input type="submit" />
		</form>
	);
};
```

### Chaining

Multiple validators can be used for a single element in a given order by chaining them. To chain multiple validators,
add a comma between their names in the data-attribute. When using chaining, the field will only be considered valid
if all validators succeed. Once a validator marks the field as invalid, all further validators are skipped.

```html
<label for="demo2_1">Email ID (all caps and ending in .de)</label>
<input id="demo2_1" type="email" required data-ok="nameCaps,emailDe" />
```

In the composition API, the additional validators can be specified when calling `validate`:

```javascript
validate(e.target, [nameCaps, emailDe]);
```

### Localization

While Ok.js itself does not localize validation messages,
the validation message function can call an existing localization function:

```typescript
import { localize } from "./some-localization-tool";

const nameFirst = {
	msg: () => localize("validation.error.daveOnly"),
	fn: (element) => element.value === "Dave",
};
```

### Caveats

#### Radiobuttons

Due to the way input elements with type `radio` work, validation is not straightforward. A single radio button only
fires its `change`/`input` event when itself is changed, not if it becomes inactive due to another radiobutton
being selected. A workaround is using an enclosing fieldset and listening to the events of that.

## Compatibility

Ok.js should work in all browsers that support the following:

-   <https://caniuse.com/form-validation>
-   <https://caniuse.com/mdn-api_htmlinputelement_setcustomvalidity>
