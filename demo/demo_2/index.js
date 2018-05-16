const ok = new Ok({
    nameCaps: {
        msg: "Must be in all caps",
        fn: val => val.toUpperCase() === val
    },
    emailDe: {
        msg: "Must end with '.de'",
        fn: val => /.+\.de$/i.test(val)
    },
    customDate: {
        msg: "Please select a date in or after 2019",
        fn: val => {
            const date = new Date(val);

            return date.getFullYear() >= 2019;
        }
    }
});

Array.from(document.querySelectorAll("[data-ok]")).forEach(inputElement => {
    ok.bind(inputElement);
});
