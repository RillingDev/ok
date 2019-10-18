const ok = new Ok({
    nameFirst: {
        msg: "Only 'Dave' allowed",
        fn: val => val === "Dave"
    },
    emailDe: {
        msg: (val) => `Please input your .de email (You entered '${val}')`,
        fn: (val, element, e) => val.endsWith(".de")
    }
});

ok.bind(document.querySelector("#inputNameFirst"));
ok.bind(document.querySelector("#inputMail"));
