const expect = require("chai").expect;
const Console = require("../Console").Console;

describe("C# Console tests", () => {
    it('should throw a TypeError with message', function () {
        const error = () => Console.writeLine();
        expect(error).to.throw(TypeError, "No string format given!")
    });
    describe("writeLine with one argument", () => {
        it("should return the JSON format of the passed argument if it is an object", () => {
            const obj = { name: "alex", family: "stef" };
            expect(Console.writeLine(obj)).to.equal('{"name":"alex","family":"stef"}');
        });
        it("should return the argument if it is a string", () => {
            const arg = "alex";
            expect(Console.writeLine(arg)).to.equal("alex");
        });
        it('should return undefined if argument is single non string', function () {
            const actual = Console.writeLine();
            expect(typeof actual).to.equal("undefined");
        });
        
    });
    describe("writeLine with two arguments", () => {
        it("should throw error if the first argument is not a string", () => {
            let error = () => Console.writeLine(1, "ciao");
            expect(error).to.throw(TypeError, "No string format given!")
        });
       
        it("should throw error if the passed arguments are less than the parameter in the templateString",()=>{
            let error = () => Console.writeLine("{1} {2}", "ciao","provca","ciao");
            expect(error).to.throw(RangeError, "Incorrect amount of parameters given!")
        });
        it("should throw error if there is an invalid placeholder index in the templateString",()=>{
            let error = () => Console.writeLine("{0} {2}", "ciao",1);
            expect(error).to.throw(RangeError, "Incorrect placeholders given!")
        });
        it("should substitute correctly the placeholders with the passed params",()=>{
            expect(Console.writeLine("{0} {1}", "Obicham","Te")).to.equal("Obicham Te");
        });
    });

});