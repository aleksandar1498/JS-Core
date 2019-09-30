const expect = require("chai").expect;
const createCalculator = require("../addSubstract").createCalculator;

describe("createCalculator()",function(){
    let calc;

    beforeEach(function () {
        calc = createCalculator();
    });
    it("should return an object containing 3 objects",function(){
        expect(calc).to.be.an("object");
    });
    it("should return an object containing all the keys",function(){
        expect(calc).to.include.all.keys('add','subtract','get');
    });
    it("should return undefined when trying to access the value",function(){
        expect(calc.value).to.be.equal(undefined);
    });
    it("should return 0 when there are no performed actions",function(){
        expect(calc.get()).to.be.equal(0);
    });
    it("should return 1 when there are 1 is added",function(){
        calc.add(1);
        expect(calc.get()).to.be.equal(1);
    });
});