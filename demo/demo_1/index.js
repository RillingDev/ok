"use strict";

Ok({
    el: ".form",
    validators: {
        nameCaps: {
            msg: "Please input your name in caps",
            fn: val => {
                return /[A-Z ]+/.test(val);
            }
        },
        emailDe: {
            msg: "Please input your .de email",
            fn: val => {
                return val.endsWith(".de");
            }
        }
    }
});
