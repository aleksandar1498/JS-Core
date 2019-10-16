const expect = require("chai").expect;
const Warehouse = require("../Warehouse").Warehouse;
describe("Warehouse manager", function () {
    let house;
    beforeEach(function () {
        house = new Warehouse(10);
    })
    describe("capacity tests", function () {
        it("should throw error if the capacity is not a number", function () {
            let func = () => { house.capacity = '10'; };
            expect(func).to.throw();
        });
        it("should throw error if the capacity passed is less then 0", function () {
            let func = () => { house.capacity = -2; };
            expect(func).to.throw();
        });
        it("should set correct capacity if passed argument is valid", function () {
            house.capacity = 2; 
            expect(house.capacity ).to.be.equal(2);
        });
    });
    describe("Add Product",function(){
        it("should throw error if there is not enough space",function(){
            let func = () => house.addProduct("Food","Pizza",100);
            expect(func).to.throw();
        });
        it("should add the product in foods ",function(){
            house.addProduct("Food","Pizza",1);
            expect(house.availableProducts["Food"].hasOwnProperty("Pizza")).to.be.true;
            expect(house.availableProducts["Food"]['Pizza']).to.be.equal(1);
        });
        it("should increase the product quantity if it exists ",function(){
            house.addProduct("Food","Pizza",1);
            house.addProduct("Food","Pizza",2);
            expect(house.availableProducts["Food"]['Pizza']).to.be.equal(3);
        });
        it("should return the correct output if the product was added",function(){
            let func =  house.addProduct("Food","Pizza",1);
            expect(func).to.deep.equal({ 'Pizza' : 1 });
        });
    });

});