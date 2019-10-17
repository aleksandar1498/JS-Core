const expect = require("chai").expect;
const PizzUni = require("../pizzuniClass");
describe("PizzUni tests", function () {
    let pizzUni;
    beforeEach('inital setting',function () {
        pizzUni = new PizzUni();
    });
    describe('functions exist tests', () => {
        it('should has following funtions', () => {
           expect(PizzUni.prototype.hasOwnProperty('constructor')).to.be.true;
           expect(PizzUni.prototype.hasOwnProperty('registerUser')).to.be.true;
           expect(PizzUni.prototype.hasOwnProperty('makeAnOrder')).to.be.true;
           expect(PizzUni.prototype.hasOwnProperty('detailsAboutMyOrder')).to.be.true;
           expect(PizzUni.prototype.hasOwnProperty('doesTheUserExist')).to.be.true;
           expect(PizzUni.prototype.hasOwnProperty('completeOrder')).to.be.true;
        });
    });
    describe("Test accessors", () => {
        it("should contains the properties 'registeredUsers,availableProducts,orders'",()=>{
            expect(pizzUni.hasOwnProperty('registeredUsers')).to.be.true;
            expect(pizzUni.hasOwnProperty('availableProducts')).to.be.true;
            expect(pizzUni.hasOwnProperty('orders')).to.be.true;
        });
        it("should has a default value of each property",() => {
            expect(pizzUni.registeredUsers).to.be.an('array').that.is.empty;
            expect(JSON.stringify(pizzUni.availableProducts)).to.be.equal('{"pizzas":["Italian Style","Barbeque Classic","Classic Margherita"],"drinks":["Coca-Cola","Fanta","Water"]}');
            expect(pizzUni.orders).to.be.an('array').that.is.empty;
        });
    });
    describe("registerUser",()=>{
        it("should throw error if the user is already registered",()=>{
            pizzUni.registerUser("alex@gmail.com");
            let fakeCall = () =>  pizzUni.registerUser("alex@gmail.com");
            expect(fakeCall).to.throw();
        });
        it("should push the newly created user to the registereUsers",()=>{
            pizzUni.registerUser("alex@gmail.com");
            expect(JSON.stringify(pizzUni.registeredUsers)).to.be.equal('[{"email":"alex@gmail.com","orderHistory":[]}]');
        });
        it("should return the newly created user",()=>{
            expect(JSON.stringify(  pizzUni.registerUser("alex@gmail.com"))).to.be.equal('{"email":"alex@gmail.com","orderHistory":[]}');
        });
    });
    describe("makeAnOrder",()=>{
        it("should throw error if the user does not exists",()=>{
            let fakeCall = () => pizzUni.makeAnOrder("Alex@gmail.com","Italian Style",'Fanta');
            expect(fakeCall).to.throw();
        });
        it("should throw error if the pizza does not exists",()=>{
            let fakeCall = () => pizzUni.makeAnOrder("Alex@gmail.com","Bulgarian Style",'Fanta');
            expect(fakeCall).to.throw();
        });
        it("should add the order with both Pizza and Drink valid",()=>{
            pizzUni.registerUser("Alex@gmail.com");
            pizzUni.makeAnOrder("Alex@gmail.com","Italian Style",'Fanta');
            expect(JSON.stringify(pizzUni.orders)).to.be.equal('[{"orderedPizza":"Italian Style","orderedDrink":"Fanta","email":"Alex@gmail.com","status":"pending"}]');
        });
        it("should add the order with valid Pizza and absent drink",()=>{
            pizzUni.registerUser("Alex@gmail.com");
            pizzUni.makeAnOrder("Alex@gmail.com","Italian Style");
            expect(JSON.stringify(pizzUni.orders)).to.be.equal('[{"orderedPizza":"Italian Style","email":"Alex@gmail.com","status":"pending"}]');
        });
        it("should add the order with valid Pizza and invalid Drink",()=>{
            pizzUni.registerUser("Alex@gmail.com");
            pizzUni.makeAnOrder("Alex@gmail.com","Italian Style","Rakiq");
            expect(JSON.stringify(pizzUni.orders)).to.be.equal('[{"orderedPizza":"Italian Style","email":"Alex@gmail.com","status":"pending"}]');
        });
        it("should return the index of the order on success",()=>{
            pizzUni.registerUser("Alex@gmail.com");
           
            expect( pizzUni.makeAnOrder("Alex@gmail.com","Italian Style","Rakiq")).to.be.equal(0);
        });
        //TODO length return

    });
    describe("detailsAboutMyOrder",()=>{
        it("should return undefined if the order id does not exists",()=>{
            expect(typeof pizzUni.detailsAboutMyOrder(14)).to.be.equal('undefined');
        });
        it("should return undefined if the passed id is not a number",()=>{
            expect(typeof pizzUni.detailsAboutMyOrder('ciao')).to.be.equal('undefined');
        });
        it("should return pending status if the order is not completed",()=>{
            pizzUni.registerUser("Alex@gmail.com");
            pizzUni.makeAnOrder("Alex@gmail.com","Italian Style","Rakiq");
            expect(pizzUni.detailsAboutMyOrder(0)).to.be.equal('Status of your order: pending')
        });
        it("should return pending status if the order is not completed",()=>{
            pizzUni.registerUser("Alex@gmail.com");
            pizzUni.makeAnOrder("Alex@gmail.com","Italian Style","Rakiq");
            pizzUni.completeOrder();
            expect(pizzUni.detailsAboutMyOrder(0)).to.be.equal('Status of your order: completed')
        });
    });
    describe("doesTheUserExist",()=>{
        it("should throw undefined if the user does not exists",()=>{
            expect(typeof pizzUni.doesTheUserExist("vesi@abv.bg")).to.be.equal('undefined');
        });
        it("should throw undefined if the email passed is of invalid type",()=>{
            expect(typeof pizzUni.doesTheUserExist(1)).to.be.equal('undefined');
        })
        it("should return the object of the user if it exists",()=>{
            pizzUni.registerUser("vesi@abv.bg");
            expect(JSON.stringify(pizzUni.doesTheUserExist("vesi@abv.bg"))).to.be.equal('{"email":"vesi@abv.bg","orderHistory":[]}');
        });
    });
    describe("completeOrder",()=>{
        it("should return undefined if there are not any orders",()=>{
            expect(typeof pizzUni.completeOrder()).to.be.equal("undefined");
        });
        it("should return -1 if there are not orders to be completed",()=>{
            pizzUni.registerUser("Alex@gmail.com");
            pizzUni.makeAnOrder("Alex@gmail.com","Italian Style","Fanta");
            pizzUni.completeOrder();
            let fakeCall = () => pizzUni.completeOrder();
            expect(fakeCall).to.throw()
        });
        it("should return the object of the first order that has to be completed",()=>{
            pizzUni.registerUser("Alex@gmail.com");
            pizzUni.makeAnOrder("Alex@gmail.com","Italian Style","Fanta");
            expect( JSON.stringify(pizzUni.completeOrder())).to.be.equal('{"orderedPizza":"Italian Style","orderedDrink":"Fanta","email":"Alex@gmail.com","status":"completed"}');
        });
    });
});