const expect = require("chai").expect;
const Calculator = require("../Calculator").Calculator;

describe("Calculator class test", () => {
    let calc;
    beforeEach(() => {
        calc = new Calculator();
    })
    describe("class structure tests", () => {
        it("should contains all the functions ", () => {
            expect(Calculator.prototype.hasOwnProperty('add')).to.be.true;
            expect(Calculator.prototype.hasOwnProperty('divideNums')).to.be.true;
            expect(Calculator.prototype.hasOwnProperty('toString')).to.be.true;
            expect(Calculator.prototype.hasOwnProperty('orderBy')).to.be.true;
        });
        it("should has the default value",()=>{
            expect(calc.hasOwnProperty("expenses")).to.be.true;
            expect(calc.expenses).to.be.an('array').that.is.empty;
        })
    });
    describe("add(data) tests",() => {
        it("should add to expenses any type of variable",() => {
            calc.add(1);
            calc.add(1.23);
            calc.add({});
            calc.add();
            calc.add([]);
            let date =Date.now();
            calc.add(date);
            expect(JSON.stringify(calc.expenses)).to.equal(`[1,1.23,{},null,[],${date}]`);
        });
    });

    describe("divideNums() tests",() =>{
        it("should throw error 'There are no numbers in the array!' if the expense is empty",()=>{
            let fakeCall = () => calc.divideNums();
            expect(fakeCall).to.throw('There are no numbers in the array!');
        });
        it("should return 'Cannot divide by zero' if the expense contains a 0 after the first number",()=>{
            calc.add(1);
            calc.add(0);
            expect(calc.divideNums()).to.be.equal('Cannot divide by zero');
        });
        it("should return 0 if the first number is 0",()=>{
            calc.add(0);
            calc.add(1);
            calc.add(2);
            expect(calc.divideNums()).to.be.equal(0);
        });
        it("should return 1 on expense => [1,'alex',1,'alex']",()=>{
            calc.add(1);
            calc.add('alex');
            calc.add(1);
            calc.add('alex');
            expect(calc.divideNums()).to.be.equal(1);
        });
        it("should return 1 on expense => [-1,'alex',1,'alex']",()=>{
            calc.add(-1);
            calc.add('alex');
            calc.add(1);
            calc.add('alex');
            expect(calc.divideNums()).to.be.equal(-1);
        });
    });
    describe("toString() tests",() => {
        it("should return 'empty array' on expense => []",()=>{
            expect(calc.toString()).to.be.equal("empty array");
        });
        it("should return '1 -> 1 -> a -> 1 when divide is not called' on expense => [1,1,a,1]",()=>{
            calc.add(1);
            calc.add(1);
            calc.add('a');
            calc.add(1);
            expect(calc.toString()).to.be.equal("1 -> 1 -> a -> 1");
        });
        it("should return '1' when divide is  called' on expense => [1,1,a,1]",()=>{
            calc.add(1);
            calc.add(1);
            calc.add('a');
            calc.add(1);
            calc.divideNums();
            expect(calc.toString()).to.be.equal("1");
        });
    });
    describe('orderBy() test',()=>{
        it("should return 'empty' if expense []",()=>{
            expect(calc.orderBy()).to.be.equal("empty");
        });
        it("should return '1, 2, 3, 4' on expense [1,3,2,4]",()=>{
            calc.add(1);
            calc.add(3);
            calc.add(2);
            calc.add(4);
            expect(calc.orderBy()).to.be.equal('1, 2, 3, 4');
        });
        it("should return '2, 4, a, z' on expense [a,2,z,4]",()=>{
            calc.add('a');
            calc.add(2);
            calc.add('z');
            calc.add(4);
            expect(calc.orderBy()).to.be.equal('2, 4, a, z');
        });
    })

});