let expect = require("chai").expect;
let sum = require("../sumOfNumbers").sum;

describe("sum(arr)", function () {

    it("should return 10 for sum [1,2,3,4] ", function () {
        expect(sum([1, 2, 3, 4])).to.be.equal(10);
    });
    it("should return 0 for sum [] ", function () {
        expect(sum([])).to.be.equal(0);
    });
    it("should return -3 for sum [-1,-2] ", function () {
        expect(sum([-1,-2])).to.be.equal(-3);
    });
    it("should return NaN for sum ['cas',-2] ", function () {
        expect(sum(['cas',-2])).to.be.NaN;
    });
    it("should return NaN for sum  ", function () {
        expect(sum("as")).to.be.NaN;
    });
});