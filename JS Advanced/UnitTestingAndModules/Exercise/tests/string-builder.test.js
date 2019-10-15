const expect = require("chai").expect;
const StringBuilder = require("../string-builder").StringBuilder;
describe("StringBuilder", function () {
    describe("Constructor", function () {
        it("It should set set an empty array if nothing is passed", function () {
            let builder = new StringBuilder();
            expect(builder._stringArray).to.be.an('array').that.is.empty;
        });
        it("It should set set an array of the passedString", function () {
            let builder = new StringBuilder("alex");
            expect(builder._stringArray).to.be.include.members(['a', 'l', 'e', 'x']);
        });
        it("It should throw error if an argument that is not a String is passed", function () {
            let error = new TypeError('Argument must be string');
            let construcorFake = function () {
                new StringBuilder(Date.now());
            };
            expect(construcorFake).to.throw();
        });
    });
})