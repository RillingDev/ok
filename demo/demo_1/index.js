"use strict";

Ok({
    el: ".form",
    methods: {
        nameCaps: val => {
            return val.split("").every(letter => letter === letter.toUpperCase());
        },
        emailDe: val => {
            return val.endsWith(".de");
        }
    }
});
