"use strict";

Ok({
    el: ".form",
    methods: {
        nameCaps: val => {
            return /[A-Z ]+/.test(val);
        },
        emailDe: val => {
            return val.endsWith(".de");
        }
    }
});
