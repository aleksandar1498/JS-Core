const expect = require("chai").expect;
const PaymentPackage = require("../PaymentPackage").paymentPackageClass;

describe("PaymentPackage class", function () {
    describe("constructor validity", function () {
        it("should create instance of the class for valid ('test',100)", function () {
            let validUser = new PaymentPackage("alex", 2);
            expect(validUser instanceof PaymentPackage).to.be.true;
        });
        it("should create instance of the class with valid properties", function () {
            let validUser = new PaymentPackage("alex", 2);
            expect(validUser.hasOwnProperty("_name")).to.be.true;
            expect(validUser.hasOwnProperty("_value")).to.be.true;
            expect(validUser.hasOwnProperty("_active")).to.be.true;
            expect(validUser.hasOwnProperty("_VAT")).to.be.true;
        });
        it("should set correctly the params if both arguments are valid", function () {
            let validUser = new PaymentPackage("alex", 2);
            expect(validUser.name).to.be.equal("alex");
            expect(validUser.value).to.be.closeTo(2, 0.01);
            expect(validUser.VAT).to.be.greaterThan(1.9);
            expect(validUser.active).to.be.true;
            expect(validUser.VAT).to.be.closeTo(20, 0.01);
            expect(validUser.VAT).to.be.greaterThan(10);

        });
        it("should throw error when initialized with incorrect values", function () {
            let user = null;
            expect(() => user = new PaymentPackage(100, 100)).to.throw(Error);
            expect(() => user = new PaymentPackage("correct", "invalid")).to.throw(Error);
            expect(() => user = new PaymentPackage("", 100)).to.throw(Error);
            expect(() => user = new PaymentPackage([], 100)).to.throw(Error);
            expect(() => user = new PaymentPackage("correct", -100)).to.throw(Error);
            expect(() => user = new PaymentPackage("correct", new Date())).to.throw(Error);
            expect(() => user = new PaymentPackage()).to.throw(Error);
            expect(() => user = new PaymentPackage(undefined, undefined)).to.throw(Error);
        });
    });

    describe("name",function(){
        it("should create instance with correct name on ('alex',10)",function(){
            let validUser = new PaymentPackage("alex", 2);
            expect(validUser.name).to.be.equal("alex");
            expect(validUser._name).to.be.equal("alex");
            expect(validUser.hasOwnProperty("_name")).to.be.true;
        });
    });
    describe("value",function(){
        it("should create instance with correct name on ('alex',10)",function(){
            let validUser = new PaymentPackage("alex", 2);
            expect(validUser.value).to.be.closeTo(2,0.01);
            expect(validUser._value).to.be.greaterThan(1.9);
            expect(validUser.hasOwnProperty("_value")).to.be.true;
        });
    });
    describe("VAT",function(){
        it("should create instance with correct default value for VAT on ('alex',10)",function(){
            let validUser = new PaymentPackage("alex", 2);
            expect(validUser.VAT).to.be.closeTo(20,0.01);
            expect(validUser._VAT).to.be.greaterThan(19);
            expect(validUser.hasOwnProperty("_VAT")).to.be.true;
        });
        it("should throw error when trying to change the value with an ")
    });
    it("should throw error if the passed value is not a number", function () {
        expect(function () {
            let validUser = new PaymentPackage("alex", 2);
            validUser.VAT = "alex";
        }).to.throw('VAT must be a non-negative number');
    });
    it("should throw error if the passed value is less than 0", function () {
        expect(function () {
            let validUser = new PaymentPackage("alex", 2);
            validUser.VAT = -2;
        }).to.throw('VAT must be a non-negative number');
    });
    it("should assign the correct value to the VAT variable", function () {
        let validUser = new PaymentPackage("alex", 2);
        validUser.VAT = 2;
        expect(validUser.VAT).to.be.equal(2);
    });


    it("should throw error if the passed value is not a correct", function () {
        expect(function () {
            let validUser = new PaymentPackage("alex", 2);
            validUser.active = "alex";
        }).to.throw('Active status must be a boolean');
    });

    it("should assign the correct value to the active variable", function () {
        let validUser = new PaymentPackage("alex", 2);
        validUser.active = false;
        expect(validUser.active).to.be.equal(false);
    });
    it("to String should return a correct representation of the object when it is in status active", function () {
        let validUser = new PaymentPackage("alex", 2);
        const output = [
            `Package: ${validUser.name}`,
            `- Value (excl. VAT): ${validUser.value}`,
            `- Value (VAT ${validUser.VAT}%): ${validUser.value * (1 + validUser.VAT / 100)}`
        ];
        expect(validUser.toString()).to.equal(output.join('\n'));
    });
    it("to String should return a correct representation of the object when it is in status inactive", function () {
        let validUser = new PaymentPackage("alex", 2);
        validUser.active = false;
        const output = [
            `Package: ${validUser.name} (inactive)`,
            `- Value (excl. VAT): ${validUser.value}`,
            `- Value (VAT ${validUser.VAT}%): ${validUser.value * (1 + validUser.VAT / 100)}`
        ];
        expect(validUser.toString()).to.equal(output.join('\n'));
    });

});