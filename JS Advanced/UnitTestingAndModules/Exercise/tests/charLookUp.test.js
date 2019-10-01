const expect = require("chai").expect;
const lookupChar = require("../charLookUp").lookupChar;
describe("lookupChar(string,index)", function () {
    describe("valid situations ", function () {
        it("should return 'a' when I call the 0 index of the string", function () {
            let word = "alex";
            let char = lookupChar(word, 0);
            expect(char).to.equal('a', 'The answer is not the correct');
        });
        it("should return 'a' when I call the last index of the string", function () {
            let word = "alex";
            let char = lookupChar(word, word.length - 1);
            expect(char).to.equal('x', 'The answer is not the correct');
        });
    });

    describe("invalid situations ", function () {
        it("should return undefined when the first argument is not a string", function () {
            
            let result = lookupChar([], 0);
            expect(result).to.equal(undefined, 'The answer is not the correct');
        });
        it("should return undefined when the second argument is not a number", function () {
            let result = lookupChar("ciao", {"alex":1});
            expect(result).to.equal(undefined, 'The answer is not the correct');
        });
        it("should return undefined when the second argument is floating point", function () {
            let result = lookupChar("ciao", 12.2);
            expect(result).to.equal(undefined, 'The answer is not the correct');
        });
        it("should return 'Incorrect index' when the arguments are correct but the index is less then 0", function () {
            let result = lookupChar("ciao", -1);
            expect(result).to.equal('Incorrect index', 'The answer is not the correct');
        });
        it("should return 'Incorrect index' when the arguments are correct but the index is more then the word length", function () {
            let result = lookupChar("ciao", 5);
            expect(result).to.equal('Incorrect index', 'The answer is not the correct');
        });
    });
});