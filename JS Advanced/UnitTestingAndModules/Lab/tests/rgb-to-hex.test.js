const expect = require("chai").expect;
const rgbToHexColor = require("../rgb-to-hex").rgbToHexColor;

describe("rgbToHexColor(red, green, blue)",function (){
    describe("red",function(){
        it("should return undefined if red is not an integer",function(){
            expect(rgbToHexColor("alex",233,22)).to.be.equal(undefined);
        });
        it("should return undefined if red value is less than 0",function(){
            expect(rgbToHexColor(-2,233,22)).to.be.equal(undefined);
        });
        it("should return undefined if red is more than 255",function(){
            expect(rgbToHexColor(289,233,22)).to.be.equal(undefined);
        });
        it("should return undefined if red is decimal value",function(){
            expect(rgbToHexColor(2.89,233,22)).to.be.equal(undefined);
        });
    });
    describe("green",function(){
        it("should return undefined if green is not an integer",function(){
            expect(rgbToHexColor(233,"alex",22)).to.be.equal(undefined);
        });
        it("should return undefined if green value is less than 0",function(){
            expect(rgbToHexColor(233,-2,22)).to.be.equal(undefined);
        });
        it("should return undefined if green is more than 255",function(){
            expect(rgbToHexColor(233,289,22)).to.be.equal(undefined);
        });
        it("should return undefined if green is decimal",function(){
            expect(rgbToHexColor(233,2.89,22)).to.be.equal(undefined);
        });
    });
    describe("blue",function(){
        it("should return undefined if blue is not an integer",function(){
            expect(rgbToHexColor(233,22,"alex")).to.be.equal(undefined);
        });
        it("should return undefined if blue value is less than 0",function(){
            expect(rgbToHexColor(233,22,-2)).to.be.equal(undefined);
        });
        it("should return undefined if blue is more than 255",function(){
            expect(rgbToHexColor(233,22,289)).to.be.equal(undefined);
        });
        it("should return undefined if blue is decimal",function(){
            expect(rgbToHexColor(233,22,2.89)).to.be.equal(undefined);
        });
    });

    describe("Nominal cases(valid input)", function () {
        it("should return #FF9EAA for (255, 158, 170)", function () {
            expect(rgbToHexColor(255, 158, 170)).to.be.equal("#FF9EAA");
        });
        it("should return #0C0D0E for (12, 13, 14)", function () {
            expect(rgbToHexColor(12, 13, 14)).to.be.equal("#0C0D0E");
        });
        it("should return #000000 for (0, 0, 0)", function () {
            expect(rgbToHexColor(0, 0, 0)).to.be.equal("#000000");
        });
        it("should return #FFFFFF for (255, 255, 255)", function () {
            expect(rgbToHexColor(255, 255, 255)).to.be.equal("#FFFFFF");
        });
    });

  
    it("should return undefined for empty",function(){
        expect(rgbToHexColor()).to.be.equal(undefined);
    });
    it('should return undefined for ("5", [3], {8:9})', function () {
       
        expect(rgbToHexColor("5", [3], {8:9})).to.be.equal(undefined);
    });
});