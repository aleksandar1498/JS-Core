const expect = require("chai").expect;
const SubscriptionCard = require("../SubscriptionCard");

describe("Subscription Card tests", () => {
    let card;
    beforeEach(() => {
        card = new SubscriptionCard("alex", "stef", "0000000")
    })
    describe("Structure tests", () => {
        it("should contain all the accessors", () => {
            expect(SubscriptionCard.prototype.hasOwnProperty("firstName")).to.be.true;
            expect(SubscriptionCard.prototype.hasOwnProperty("lastName")).to.be.true;
            expect(SubscriptionCard.prototype.hasOwnProperty("SSN")).to.be.true;
            expect(SubscriptionCard.prototype.hasOwnProperty("isBlocked")).to.be.true;
        });
        it("should contain all the functions", () => {
            expect(SubscriptionCard.prototype.hasOwnProperty("addSubscription")).to.be.true;
            expect(SubscriptionCard.prototype.hasOwnProperty("isValid")).to.be.true;
            expect(SubscriptionCard.prototype.hasOwnProperty("block")).to.be.true;
            expect(SubscriptionCard.prototype.hasOwnProperty("unblock")).to.be.true;
        });
        it("should contain all default on initialization 'alex','stef','0000000'", () => {
            expect(card.hasOwnProperty('_firstName')).to.be.true;
            expect(card.hasOwnProperty('_lastName')).to.be.true;
            expect(card.hasOwnProperty('_SSN')).to.be.true;
            expect(card.hasOwnProperty('_subscriptions')).to.be.true;
            expect(card.hasOwnProperty('_blocked')).to.be.true;
        });
        it("should set all values on initialization 'alex','stef','0000000'", () => {
            expect(card._firstName).to.equal('alex');
            expect(card._lastName).to.equal('stef');
            expect(card._SSN).to.equal('0000000');
            expect(card._subscriptions).to.be.an('array').that.is.empty;
            expect(card._blocked).to.equal(false);
        });
        it("should not alter the existing value all values on initialization 'alex','stef','0000000'", () => {
            card.firstName = 'stef';
            expect(card._firstName).to.equal('alex');
            card._lastName = 'stef';
            expect(card._lastName).to.equal('stef');
            card.SSN = 'stef';
            expect(card._SSN).to.equal('0000000');
            card.block = true;
            expect(card._blocked).to.equal(false);
        });
    });
    describe("addSubscription(line, startDate, endDate) tests", () => {
        it("should push value '120', new Date('2018-04-22'), new Date('2018-05-21')", () => {
            let startDate = new Date('2018-04-22')+"";
            let endDate = new Date('2018-05-21')+"";
            card.addSubscription('120',startDate ,endDate );
            expect(JSON.stringify(card._subscriptions)).to.equal(`[{"line":"120","startDate":"${startDate}","endDate":"${endDate}"}]`);
        });
        it("should push value '*', new Date('2018-04-22'), new Date('2018-05-21')", () => {
            let startDate = new Date('2018-04-22')+"";
            let endDate = new Date('2018-05-21')+"";
            card.addSubscription('*',startDate ,endDate );
            expect(JSON.stringify(card._subscriptions)).to.equal(`[{"line":"*","startDate":"${startDate}","endDate":"${endDate}"}]`);
        });
     
    })
    describe('isValid function tests', () => {
        it('should return true for valid params', () => {
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.isTrue(card.isValid('120', new Date('2018-04-22')));
        });
        it('should return true for valid params', () => {
            card.addSubscription('*', new Date('2019-06-09'), new Date('2019-07-07'));
            assert.isTrue(card.isValid('*', new Date('2019-07-07')));
        });
        it('should return false for blocked value', () => {
            card.block();
            card.addSubscription('120', new Date('2019-06-09'), new Date('2019-07-07'));
            assert.isFalse(card.isValid('120', new Date('2019-07-07')));
        });
        it('should return false for invalid params', () => {
            card.addSubscription('*', new Date('2019-06-09'), new Date('2019-07-07'));
            assert.isFalse(card.isValid('*', new Date('2019-07-16')));
        });
    });

    describe("block() / unblock() tests",()=>{
        it("block() and unblock() should change the state of _blocked",()=>{
            expect(card._blocked).to.equal(false);
            card.block();
            expect(card._blocked).to.equal(true);
            card.unblock();
            expect(card._blocked).to.equal(false);
        })
     


    });
})