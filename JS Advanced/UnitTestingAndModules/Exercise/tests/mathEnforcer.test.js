const expect = require("chai").expect;
const mathEnforcer = require("../mathEnforcer").mathEnforcer;
describe("mathEnforcer",function(){
    describe("addFive",function(){
        it("Should return undefined if it is passed a non number argument",function(){
            expect(mathEnforcer.addFive("prova")).to.be.equal(undefined);
        });
        it("Should return undefined if it is passed a date",function(){
            expect(mathEnforcer.addFive(new Date())).to.be.equal(undefined);
        });
        it("Should return the abs value of the passed number increased by five",function(){
            let passedValue = -5;
            const expectValue = 0;
            expect(mathEnforcer.addFive(passedValue)).to.be.closeTo(expectValue,0.01);
        });
        it("Should return the number increased by five",function(){
            let passedValue = 5;
            const expectValue = 10;
            expect(mathEnforcer.addFive(passedValue)).to.be.closeTo(expectValue,0.01);
        });
        it("Should return the number increased by five",function(){
            let passedValue = 5.145;
            const expectValue = 10.145;
            expect(mathEnforcer.addFive(passedValue)).to.be.closeTo(expectValue,0.01);
        });
    });

    describe("subtractTen",function(){
        it("Should return undefined if it is passed a non number argument",function(){
            expect(mathEnforcer.subtractTen("prova")).to.be.equal(undefined);
        });
        it("Should return undefined if it is passed a date",function(){
            expect(mathEnforcer.subtractTen(new Date())).to.be.equal(undefined);
        });
        it("Should return the number decreased by ten",function(){
            let passedValue = 5;
            const expectValue = -5;
            expect(mathEnforcer.subtractTen(passedValue)).to.be.closeTo(expectValue,0.01);
        });
        it("Should return the negative number decreased by ten",function(){
            let passedValue = -5;
            const expectValue = -15;
            expect(mathEnforcer.subtractTen(passedValue)).to.be.closeTo(expectValue,0.01);
        });
        it("Should return the number decreased by ten",function(){
            let passedValue = 5.145;
            const expectValue = -4.855;
            expect(mathEnforcer.subtractTen(passedValue)).to.be.closeTo(expectValue,0.01);
        });
    });

    describe("sum",function(){
        it("Should return undefined if it the first argument is invalid",function(){
            expect(mathEnforcer.sum("prova",10)).to.be.equal(undefined);
        });
        it("Should return undefined if it the second argument is invalid",function(){
            expect(mathEnforcer.sum(10,"prova")).to.be.equal(undefined);
        });
        it("Should return undefined if it both argument are invalid",function(){
            expect(mathEnforcer.sum("prova","prova")).to.be.equal(undefined);
        });
        it("Should return the sum of the two numbers",function(){
            let passedValueA = 5;
            let passedValueB = 5;
            let expectValue = 10;
            expect(mathEnforcer.sum(passedValueA,passedValueB)).to.be.closeTo(expectValue,0.01);
        });
        it("Should return the sum of the two numbers",function(){
            let passedValueA = -5;
            let passedValueB = 5;
            let expectValue = 0;
            expect(mathEnforcer.sum(passedValueA,passedValueB)).to.be.closeTo(expectValue,0.01);
        });
        it("Should return the sum of the two numbers",function(){
            let passedValueA = 5;
            let passedValueB = -5;
            let expectValue = 0;
            expect(mathEnforcer.sum(passedValueA,passedValueB)).to.be.closeTo(expectValue,0.01);
        });
        it("Should return the sum of the two numbers",function(){
            let passedValueA = 5.123;
            let passedValueB = 5;
            let expectValue = 10.123;
            expect(mathEnforcer.sum(passedValueA,passedValueB)).to.be.closeTo(expectValue,0.01);
        });
        it("Should return the sum of the two numbers",function(){
            let passedValueA = 5;
            let passedValueB = 5.123;
            let expectValue = 10.123;
            expect(mathEnforcer.sum(passedValueA,passedValueB)).to.be.closeTo(expectValue,0.01);
        });

    });
});