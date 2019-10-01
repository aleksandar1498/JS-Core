const expect = require("chai").expect;
const isOddOrEven = require("../isOddOrEven").isOddOrEven;

describe("isOddOrEven(string)",function(){
    it("should return undefined if there is no argument ",function(){
        let res = isOddOrEven();
        expect(res).to.be.equal(undefined);
    });
    it("should return undefined if the argument is not a string",function(){
        let res = isOddOrEven([]);
        expect(res).to.be.equal(undefined);
    });
    it("should throw even if the argument length is even",function(){
        let res = isOddOrEven("ciao");
        expect(res).to.be.equal("even");
    });
    it("should return undefined if the argument is not a string",function(){
        let res = isOddOrEven({"ciao":"ss"});
        expect(res).to.be.equal(undefined);
    });
    it("should throw even if the argument length is odd",function(){
        let res = isOddOrEven("ciaoa");
        expect(res).to.be.equal("odd");
    });
});