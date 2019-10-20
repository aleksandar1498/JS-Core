const expect = require("chai").expect;
const AutoService = require("../autoService.js").AutoService;

describe("AutoService tests",()=>{
    let auto;
    beforeEach(()=>{
        auto = new AutoService(3);
    })
    describe("class tests ",()=>{
        it("should contain all the functionalities",()=>{
            expect(AutoService.prototype.hasOwnProperty('repairCar')).to.be.true;
            expect(AutoService.prototype.hasOwnProperty('signUpForReview')).to.be.true;
            expect(AutoService.prototype.hasOwnProperty('carInfo')).to.be.true;
            expect(AutoService.prototype.hasOwnProperty('availableSpace')).to.be.true;
        });
        it("shoiuld initialize the default values",()=>{
            expect(auto.hasOwnProperty('garageCapacity')).to.be.true;
            expect(auto.garageCapacity).to.be.equal(3);
            expect(auto.hasOwnProperty('workInProgress')).to.be.true;
            expect(auto.workInProgress).to.be.an("array").that.is.empty;
            expect(auto.hasOwnProperty('backlogWork')).to.be.true;
            expect(auto.backlogWork).to.be.an("array").that.is.empty;
        });
    });
    describe("availableSpace() tests",()=>{
        it("should return > 0 when space is available ",()=>{
            expect(auto.availableSpace).to.be.above(0);
        });
        it("should return < 0 when there is no available space ",()=>{
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            auto.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            expect(auto.availableSpace).to.be.most(0);
        });
    });
    describe("signUpForReview(clientName, plateNumber, carInfo) tests",()=>{
        it("should adds it to workInProgress if there is space : auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'}",()=>{
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            expect(JSON.stringify(auto.workInProgress)).to.equal('[{"plateNumber":"CA1234CA","clientName":"Peter","carInfo":{"engine":"MFRGG23","transmission":"FF4418ZZ","doors":"broken"}}]');
        });
        it("should adds empty object if nothing is passed as argument to workInProgress if there is space : auto.signUpForReview()",()=>{
            auto.signUpForReview();
            expect(JSON.stringify(auto.workInProgress)).to.equal('[{}]');
        });
        it("should adds it to backLog if there is no space : auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'}",()=>{
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            expect(JSON.stringify(auto.backlogWork)).to.equal('[{"plateNumber":"CA1234CA","clientName":"Peter","carInfo":{"engine":"MFRGG23","transmission":"FF4418ZZ","doors":"broken"}}]');
        });
        it("should adds empty object if nothing is passed as argument to workInProgress if there is space : auto.signUpForReview()",()=>{
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            auto.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            auto.signUpForReview();
            expect(JSON.stringify(auto.backlogWork)).to.equal('[{}]');
        });
    });
    describe("carInfo(plateNumber,clientName) tests",()=>{
        it("should return 'There is no car with platenumber ${plateNumber} and owner ${clientName}.' if it is not present neither in the backlog or workinprogrss",()=>{
            expect(auto.carInfo("T1498KT","Aleksandar")).to.be.equal("There is no car with platenumber T1498KT and owner Aleksandar.")
        });
        it("should return the car info if it is present in the backlog or workinprogrss",()=>{
            auto.signUpForReview('Aleksandar', 'T1498KT', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            expect(JSON.stringify(auto.carInfo("T1498KT","Aleksandar"))).to.be.equal('{"plateNumber":"T1498KT","clientName":"Aleksandar","carInfo":{"engine":"MFRGG23","transmission":"FF4418ZZ","doors":"broken"}}')
        });
        it("should return the car info from the backlog if it is present",()=>{
            auto.signUpForReview('Aleksandar', 'T1498KT', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            auto.signUpForReview('Aleksandar', 'T1498KT', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

            auto.signUpForReview('Vesi', 'T7756KT', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

            expect(JSON.stringify(auto.carInfo("T7756KT","Vesi"))).to.be.equal('{"plateNumber":"T7756KT","clientName":"Vesi","carInfo":{"engine":"MFRGG23","transmission":"FF4418ZZ","doors":"broken"}}')
        });
        it("should return 'There is no car with platenumber undefined and owner undefined.' when no arguments are passed .",()=>{
            expect(auto.carInfo()).to.be.equal('There is no car with platenumber undefined and owner undefined.')

        })
    });
    describe("repairCar() tests",()=>{
        it("should return 'No clients, we are just chilling...' if there are not cars to repair",()=>{
            expect(auto.repairCar()).to.be.equal('No clients, we are just chilling...');
        });
        it("should return 'Your car was fine, nothing was repaired.' if car info is empty",() =>{
            auto.signUpForReview('Aleksandar', 'T1498KT',{});
            expect(auto.repairCar()).to.be.equal('Your car was fine, nothing was repaired.');
        }); 
        it("should return 'Your car was fine, nothing was repaired.' if there are not broken parts",() =>{
            auto.signUpForReview('Aleksandar', 'T1498KT',{'engine': 'NOTBROK'});
            expect(auto.repairCar()).to.be.equal('Your car was fine, nothing was repaired.');
        }); 
        it("should return the repaired parts if car info is not empty",() =>{
            auto.signUpForReview('Aleksandar', 'T1498KT',{'engine': 'broken','jena':'broken'});
            expect(auto.repairCar()).to.be.equal('Your engine and jena were repaired.');
        });
        it("should return the repaired parts if car info is not empty",() =>{
            auto.signUpForReview('Aleksandar', 'T1498KT',{'engine': 'broken'});
            expect(auto.repairCar()).to.be.equal('Your engine were repaired.');
        });
    })
   
});