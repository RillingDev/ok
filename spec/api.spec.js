"use strict";

describe("API usage: ", function() {
    const Chevron = require("../dist/chevron.common.js");
    const myChev = new Chevron();

    myChev.extend("myEmtpyType", function(module, dependencies) {
        return module;
    });
    myChev.service("myEmtpyTypeModule", [], function() {
        return "foo";
    });
    it("Custom empty type", function() {
        expect(myChev.access("myEmtpyTypeModule")()).toBe("foo");
    });


    myChev.extend("myServiceLikeType", function(module, dependencies) {
        const serviceFn = module.fn;

        module.fn = function() {
            //Chevron service function wrapper
            //return function with args injected
            return serviceFn.apply(null, dependencies.concat(Array.from(arguments)));
        };

        return module;
    });
    myChev.service("myServiceLikeModule", [], function(foo) {
        return foo + "bar";
    });
    it("Custom servicelike type", function() {
        expect(myChev.access("myServiceLikeModule")("foo")).toBe("foobar");
    });

});
