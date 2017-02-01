"use strict";

describe("Mixed types: ", function () {
    const Chevron = require("../dist/chevron.common.js");
    const myChev = new Chevron();


    myChev.service("myService1", [], function (foo) {
        return foo * 2;
    });
    myChev.factory("myFactory1", ["myService1"], function (myService1) {
        const _this = this;

        _this.bar = myService1(21);
    });
    it("Simple mixed types", function () {
        expect(myChev.access("myFactory1").bar).toBe(42);
    });



    myChev.service("myService2", ["myFactory1", "myService1"], function (myFactory1, myService1) {
        return myService1(myFactory1.bar);
    });
    myChev.factory("myFactory2", ["myService2", "myFactory1", "myService1"], function (myService2, myFactory1, myService1) {
        const _this = this;

        _this.foo = myService2() + myService1(myFactory1.bar);
    });
    it("Complex mixed types", function () {
        expect(myChev.access("myFactory2").foo).toBe(168);
    });

});
