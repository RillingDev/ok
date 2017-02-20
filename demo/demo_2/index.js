"use strict";

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
            fn: val => {
                return val.endsWith(".de");
            }
        },
        customDate: {
            msg: "Please select a date in or after 2019",
            fn: val => {
                const date = new Date(val);

                return date.getFullYear() >= 2019;
            }
        }
    }
});
