const expect = require("chai").expect;
const HolidayPackage = require("../HolidayPackage").HolidayPackage;

describe("HolidayPackage tests",()=>{
    let holi;
    beforeEach(()=>{
        holi = new HolidayPackage("Sofia","Winter")
    });
    describe("structure tests",()=>{
        it("should contain all the presented functionality",()=>{
            expect(HolidayPackage.prototype.hasOwnProperty("constructor")).to.be.true;
            expect(HolidayPackage.prototype.hasOwnProperty("showVacationers")).to.be.true;
            expect(HolidayPackage.prototype.hasOwnProperty("addVacationer")).to.be.true;
            expect(HolidayPackage.prototype.hasOwnProperty("generateHolidayPackage")).to.be.true;
            expect(HolidayPackage.prototype.hasOwnProperty("constructor")).to.be.true;
        });
        it("should contain all the default values",()=>{
            expect(holi.hasOwnProperty('vacationers')).to.be.true;
            expect(holi.vacationers).to.be.an("array").that.is.empty;
            expect(holi.hasOwnProperty('destination')).to.be.true;
            expect(holi.destination).to.be.equal("Sofia");
            expect(holi.hasOwnProperty('season')).to.be.true;
            expect(holi.season).to.be.equal("Winter");
            expect(typeof holi.insuranceIncluded).to.be.equal('boolean');
            expect(holi.insuranceIncluded).to.be.equal(false);
        });
        it("should initialize with undefined if the args are not passed",()=>{
            let inner = new HolidayPackage();
            expect(inner.vacationers).to.be.an("array").that.is.empty;
            expect(typeof inner.destination).to.be.equal("undefined");
            expect(typeof inner.season).to.be.equal("undefined");
            expect(inner.insuranceIncluded).to.be.equal(false);
        })
        it("should initialize with undefined if one arg is not passed",()=>{
            let inner = new HolidayPackage("Prova");
            expect(inner.vacationers).to.be.an("array").that.is.empty;
            expect(inner.destination).to.be.equal("Prova");
            expect(typeof inner.season).to.be.equal("undefined");
            expect(inner.insuranceIncluded).to.be.equal(false);
        })
    });
    describe("showVacationers() tests",()=>{
        it("should return 'No vacationers are added yet' if there are not vacationers",()=>{
            expect(holi.showVacationers()).to.be.equal('No vacationers are added yet');
        });
        it("should return 'Vacationers:\nvesi' if vacationers = ['Vesi Stefanova']",()=>{
            holi.addVacationer('Vesi Stefanova');
            expect(holi.showVacationers()).to.be.equal('Vacationers:\nVesi Stefanova');
        });
        it("should return 'Vacationers:\nvesi' if vacationers = ['Vesi Stefanova','Aleksandar Stefanov']",()=>{
            holi.addVacationer('Vesi Stefanova');
            holi.addVacationer('Aleksandar Stefanov');
            expect(holi.showVacationers()).to.be.equal('Vacationers:\nVesi Stefanova\nAleksandar Stefanov');
        });
    });
    describe("addVacationer() tests",()=>{
        it("should throw 'Vacationer name must be a non-empty string' if passed argument is not valid",()=>{
            let fakeCall = () => holi.addVacationer(1);
            let fakeCallEmptyString = () => holi.addVacationer(' ');
            expect(fakeCall).to.throw('Vacationer name must be a non-empty string');
            expect(fakeCallEmptyString).to.throw('Vacationer name must be a non-empty string');
        })
        it("should throw 'Name must consist of first name and last name' if invalid count of words are passed",()=>{
            let fakeCall = () => holi.addVacationer("alex");
            let fakeCallMoreThenTwoParams = () => holi.addVacationer('alex alex alex');
            expect(fakeCall).to.throw('Name must consist of first name and last name');
            expect(fakeCallMoreThenTwoParams).to.throw('Name must consist of first name and last name');
        })
        it('should add correctly on success',()=>{
            holi.addVacationer("alex alex");
            expect(holi.vacationers).to.include.members(['alex alex']);
        })
    });
    describe("set insuranceIncluded(insurance) tests",() => {
        it("should throw error if a non boolean is passed",()=>{
            let fakeCall = () => holi.insuranceIncluded = 1;
            let fakeCall2 = () => holi.insuranceIncluded = '';
            expect(fakeCall).to.throw('Insurance status must be a boolean');
            expect(fakeCall2).to.throw('Insurance status must be a boolean');
        })
        it("should set the new value",()=>{
            holi.insuranceIncluded = true;
            expect(holi.insuranceIncluded).to.be.equal(true);

        })
    });

    describe("generateHolidayPackage() tests",() =>{
        it("should throw error if the vacationers length is less then 1",()=>{
            let fakeCall = () => holi.generateHolidayPackage();
            expect(fakeCall).to.throw('There must be at least 1 vacationer added');
        })
        it("should return the holiday package for single person",() => {       
            let basicPackageSpring = new HolidayPackage("Sofia","Spring");
            basicPackageSpring.addVacationer("alex stef");
            expect(basicPackageSpring.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nalex stef\nPrice: 400");

            let basicPackageAutumn = new HolidayPackage("Sofia","Autumn");
            basicPackageAutumn.addVacationer("alex stef");
            expect(basicPackageAutumn.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nalex stef\nPrice: 400");
            
            let standardPackageSummer = new HolidayPackage("Sofia","Summer");
            standardPackageSummer.addVacationer("alex stef");
            expect(standardPackageSummer.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nalex stef\nPrice: 600");

            let standardPackageWinter = new HolidayPackage("Sofia","Summer");
            standardPackageWinter.addVacationer("alex stef");
            expect(standardPackageWinter.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nalex stef\nPrice: 600");

            let premiumPackageSummer = new HolidayPackage("Sofia","Summer");
            premiumPackageSummer.addVacationer("alex stef");
            premiumPackageSummer.insuranceIncluded = true;
            expect(premiumPackageSummer.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nalex stef\nPrice: 700");

            let premiumPackageWinter = new HolidayPackage("Sofia","Summer");
            premiumPackageWinter.addVacationer("alex stef");
            premiumPackageWinter.insuranceIncluded = true;
            expect(premiumPackageWinter.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nalex stef\nPrice: 700");

         
           /* let basicPackageSpring = new HolidayPackage("Sofia","Spring");
            basicPackageSpring.addVacationer("alex stef");
            expect(basicPackageSpring.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nalex stef\nPrice: 400");
            
            let basicPackageSpring = new HolidayPackage("Sofia","Spring");
            basicPackageSpring.addVacationer("alex stef");
            expect(basicPackageSpring.generateHolidayPackage()).to.be.equal("Holiday Package Generated\nDestination: Sofia\nVacationers:\nalex stef\nPrice: 400");
            */
        });
    });
});