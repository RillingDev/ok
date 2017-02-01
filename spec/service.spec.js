"use strict";

describe("Basic Service: ", function() {
    const Chevron = require("../dist/chevron.common.js");
    const myChev = new Chevron();

    myChev.service("myService1", [], function(foo) {
        return foo + "bar";
    });
    it("Simple service", function() {
        expect(myChev.access("myService1")("foo")).toBe("foobar");
    });


    myChev.service("myService2", ["myService1"], function(myService1, foo) {
        return myService1(foo) + "Lorem";
    });
    it("Service with dependency", function() {
        expect(myChev.access("myService2")("foo")).toBe("foobarLorem");
    });


    myChev.service("myService3", ["myService1", "myService2"], function(myService1, myService2, foo) {
        return myService1(foo) + "ipsum" + myService2(foo);
    });
    myChev.service("myService4", ["myService3", "myService2"], function(myService3, myService2, foo) {
        return myService3(foo) + "et dolor" + myService2(foo);
    });
    it("Service with multiple dependencies", function() {
        expect(myChev.access("myService4")("foo")).toBe("foobaripsumfoobarLoremet dolorfoobarLorem");
    });

});
