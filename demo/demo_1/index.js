const ok = new Ok({
    nameFirst: {
        msg: "only 'Dave' allowed",
        fn: val => val === "Dave"
    },
    emailDe: {
        msg: "Please input your .de email",
        fn: val => val.endsWith(".de")
    }
});

ok.bind(document.querySelector("#inputNameFirst"));
ok.bind(document.querySelector("#inputMail"));
