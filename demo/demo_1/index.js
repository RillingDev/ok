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

ok.bind(document.querySelector("#inputNameFirst"));
ok.bind(document.querySelector("#inputMail"));
