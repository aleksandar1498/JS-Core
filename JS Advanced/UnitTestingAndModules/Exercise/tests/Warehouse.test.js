const expect = require("chai").expect;
const Warehouse = require("../Warehouse").Warehouse;
const assert = require('chai').assert;
describe("Warehouse manager", function () {
    let house;
    beforeEach(function () {
        house = new Warehouse(10);
    })
   
    describe("accessors  tests", function () {
        it("should throw error if the capacity is not a number", function () {
            let func = () => { house.capacity = 'prova'; };
            expect(func).to.throw();
        });
        it("should throw error if the capacity passed is less then 0", function () {
            let func = () => { house.capacity = -2; };
            expect(func).to.throw();
        });
        it("should throw error if the capacity passed is equal to 0", function () {
            let func = () => { house.capacity = 0; };
            expect(func).to.throw();
        });
        it("should set correct capacity if passed argument is valid", function () {
            house.capacity = 2; 
            expect(house.capacity ).to.be.equal(2);
        });
        it('should has following default values', function () {
            
            expect(house.capacity).to.be.equal(10);
            expect(JSON.stringify(house.availableProducts)).to.be.equal('{"Food":{},"Drink":{}}');
        });
    });
    describe("Add Product",function(){
        it("should throw error if there is not enough space",function(){
            let func = () => house.addProduct("Food","Pizza",100);
            expect(func).to.throw();
        });
        it("should add the product in foods ",function(){
            house.addProduct("Food","Pizza",1);
            expect(house.availableProducts["Food"]['Pizza']).to.be.equal(1);
        });
        it("should add the product in drinks ",function(){
            house.addProduct("Drink","Vodka",1);
            expect(house.availableProducts["Drink"]['Vodka']).to.be.equal(1);
        });
        it("should add the product in foods  if added quantity is 0",function(){
            house.addProduct("Food","Pizza",0);
            expect(house.availableProducts["Food"].hasOwnProperty("Pizza")).to.be.true;
            expect(house.availableProducts["Food"]['Pizza']).to.be.equal(0);
        });
        it("should increase the product quantity if it exists ",function(){
            house.addProduct("Food","Pizza",1);
            house.addProduct("Food","Pizza",2);
            expect(house.availableProducts["Food"]['Pizza']).to.be.equal(3);
        });
    
    });
    describe("Order Products By Type",function(){
        it("should sort the available products of type food",function(){
            house.addProduct("Food","Pizza",2);
            house.addProduct("Food","Cannolo",1);
            house.addProduct("Food","Sudjuk",3);
            house.orderProducts("Food");
            expect(JSON.stringify(house.availableProducts.Food)).to.be.equal('{"Sudjuk":3,"Pizza":2,"Cannolo":1}');
        });
        it("should sort the available products of type drink",function(){
            house.addProduct("Drink","Pizza",2);
            house.addProduct("Drink","Cannolo",1);
            house.addProduct("Drink","Sudjuk",3);
            house.orderProducts("Drink");
            expect(JSON.stringify(house.availableProducts.Drink)).to.be.equal('{"Sudjuk":3,"Pizza":2,"Cannolo":1}');
        });
      
    });
    describe("occupiedCapacity()",function(){
        it("should return 0 if the available products is emtpy",function() {
            expect(house.occupiedCapacity()).to.be.equal(0);
        });
        it("should return the correct number of product  if the available products is not emtpy",function() {
            house.addProduct("Food","Pizza",2);
            house.addProduct("Drink","Cannolo",1);
            house.addProduct("Food","Sudjuk",3);
            expect(house.occupiedCapacity()).to.be.equal(6);
        });
    });

    describe("revision()",function(){
        it("should throw 'The warehouse is empty' if the available products is emtpy",function() {
            expect(house.revision()).to.be.equal('The warehouse is empty');
        });
        it("should return the correct output for Food products available in the stock",function() {
            house.addProduct('Food', 'cake', 1);
            house.addProduct('Food', 'pasta', 1);
            house.addProduct('Food', 'cookies', 1);
            house.addProduct('Drink', 'coke', 1);
            expect(house.revision()).to.be.equal('Product type - [Food]\n- cake 1\n- pasta 1\n- cookies 1\nProduct type - [Drink]\n- coke 1');
        });
    });
    describe("scrapeAProduct",function(){
        it("should throw undefined if product is not found in both the types",function(){
            let fakeFunction = () => {
                return house.scrapeAProduct("Laina",3);
            }
            expect(fakeFunction).to.throw();
        });
        it("should reset if the required quantity of the product is more then the available",function(){
            house.addProduct("Food","Pizza",1);
            house.scrapeAProduct("Pizza",3);
            expect(house.availableProducts['Food']['Pizza']).to.be.equal(0);
        });
        it("should reduce the quantity if the required one is less then the available",function(){
            house.addProduct("Food","Pizza",4);
            house.scrapeAProduct("Pizza",3);
            expect(house.availableProducts['Food']['Pizza']).to.be.equal(1);
        });
    });


});