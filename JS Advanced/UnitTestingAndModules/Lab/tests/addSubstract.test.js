const expect = require("chai").expect;
const createCalculator = require("../addSubtract").createCalculator;

describe("createCalculator()", function () {
    let calc;

    beforeEach(function () {
        calc = createCalculator();
    });
    it("should return an object containing 3 objects", function () {
        expect(calc).to.be.an("object");
    });
    it("should return an object containing all the keys", function () {
        expect(calc).to.include.all.keys('add', 'subtract', 'get');
    });
    describe("get(num)", function () {
        it("should return undefined when trying to access the value", function () {
            expect(calc.value).to.be.equal(undefined);
        });
        it("should return 0 when there are no performed actions", function () {
            expect(calc.get()).to.be.equal(0);
        });
    });
    describe("add(num)", function () {
        it("should return 8 when there add is called twice with 4", function () {
            calc.add(4);
            calc.add(4);
            expect(calc.get()).to.be.equal(8);
        });
        it("should return the current value when there add is applied with 0", function () {
            calc.add(0);
            expect(calc.get()).to.be.equal(0);
        });
        it("should return 1 when there are 1 is added", function () {
            calc.add(1);
            expect(calc.get()).to.be.equal(1);
        });
        it("should return -1 when there are -1 is added", function () {
            calc.add(-1);
            expect(calc.get()).to.be.equal(-1);
        });
        it("should return NaN when there are no passed arguments on add", function () {
            calc.add();
            expect(calc.get()).to.be.NaN;
        });
        it("should return NaN when on add is passed an invalid argument", function () {
            calc.add([]);
            expect(calc.get()).to.be.NaN;
        });
        it("should return NaN when on add is passed an invalid argument", function () {
            calc.add('nello');
            expect(calc.get()).to.be.NaN;
        });
        it("should return NaN when on add is passed an invalid argument", function () {
            calc.add({'nello':2});
            expect(calc.get()).to.be.NaN;
        });
       
    });
    describe("subtract(num)", function () {
        it("should return 4 when there subtract is called with four", function () {
            calc.add(4);
            calc.subtract(4);
            expect(calc.get()).to.be.equal(4);
        });
        it("should return the current value when there subtract is applied with 0", function () {
            calc.subtract(0);
            expect(calc.get()).to.be.equal(0);
        });
        it("should return 1 when there are 1 is subtracted", function () {
            calc.subtract(1);
            expect(calc.get()).to.be.equal(-1);
        });
        it("should return -1 when there are -1 is subtracted", function () {
            calc.subtract(-1);
            expect(calc.get()).to.be.equal(1);
        });
        it("should return NaN when there are no passed arguments on subtract", function () {
            calc.subtract();
            expect(calc.get()).to.be.NaN;
        });
        it("should return NaN when on subtract is passed an invalid argument", function () {
            calc.subtract([]);
            expect(calc.get()).to.be.NaN;
        });
        it("should return NaN when on subtract is passed an invalid argument", function () {
            calc.subtract('nello');
            expect(calc.get()).to.be.NaN;
        });
        it("should return NaN when on subtract is passed an invalid argument", function () {
            calc.subtract({'nello':2});
            expect(calc.get()).to.be.NaN;
        });
        

    });
});