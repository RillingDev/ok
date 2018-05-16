const ok = new Ok({
    nameCaps: {
        msg: "Please input your name in caps",
        fn: val => val.toUpperCase() === val
    },
    emailDe: {
        msg: "Please input your .de email",
        fn: val => /.+\.de/.test(val)
    },
    customDate: {
        msg: "Please select a date in or after 2019",
        fn: val => {
            const date = new Date(val);

            return date.getFullYear() >= 2019;
        }
    },
    customCheck: {
        msg: "Can only be checked if the change event has an even timestamp",
        fn: (val, element, e) => Math.floor(e.timeStamp) % 2 === 0
    }
});

Array.from(document.querySelectorAll("[data-ok]")).forEach(inputElement => {
    ok.bind(inputElement);
});
