const expect = require("chai").expect;
const check = require("../checkForSymmetry").isSymmetric;

describe("isSymmetric(arr)",function(){
    it("should return false if the argument is not an array",function(){
        expect(check("ciao")).to.be.false;
    })
    it("should return false if it is not an array",function(){
        expect(check(2,1,1,2)).to.be.false;
    })
    it("should return false if the array is not symmetric",function(){
        expect(check([1,2,3,3])).to.be.false;
    })
    it("should return false if the array is symmetric",function(){
        expect(check([-1,2,-1])).to.be.false;
    })
    it("should return false if the array is not symmetric",function(){
        expect(check([-1,2,-1,-2])).to.be.false;
    })
    it("should return true if the array is symmetric",function(){
        expect(check([1,2,2,1])).to.be.true;
    })
    it("should return true if the array is symmetric",function(){
        expect(check([1,2,3,2,1])).to.be.true;
    })
    it("should return false if the array is symmetric",function(){
        expect(check([1,2,3,2,2])).to.be.false;
    })
    it("should return false if the array is composed by elements of diefferent type not symmetric",function(){
        expect(check([5,'hi',{a:5},new Date(),{X:5},'hi',5])).to.be.false;
    })
    it("should return true if the array is composed by elements of diefferent type symmetric",function(){
        expect(check([5,'hi',{a:5},new Date(),{a:5},'hi',5])).to.be.false;
    })
    it("should return true if the array is empty",function(){
        expect(check([])).to.be.true;
    })

    it("should return false if the has only one item",function(){
        expect(check([1])).to.be.true;
    })
    
})