"use strict";

Ok({
    el: ".form",
    validators: {
        nameFirst: {
            msg: "only 'Dave' allowed",
            fn: val => {
                return val.toLowerCase() === "dave";
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
