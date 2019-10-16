const expect = require("chai").expect;
const PaymentPackage = require("../PaymentPackage").PaymentPackage;

describe("Payment Package",function(){
    describe("constructor",function(){
        describe("name",function(){
            it("should throw Error('Name must be a non-empty string') if a string is not passed as name",function(){
                let fakeCall = () => {
                    new PaymentPackage(1,2);
                }
                expect(fakeCall).to.throw();
            });
            it("should throw Error('Name must be a non-empty string') if a string is not passed as name",function(){
                let fakeCall = () => {
                    new PaymentPackage(undefined,2);
                }
                expect(fakeCall).to.throw();
            });
            it("should throw Error('Name must be a non-empty string') if an empty string is  passed as name",function(){
                let fakeCall = () => {
                    new PaymentPackage('',2);
                }
                expect(fakeCall).to.throw();
            });
            it("shouldset correct if a valid argument is  passed as name",function(){
               
                  let package = new PaymentPackage('akex',2);
                
                expect(package.name).to.be.equal("akex");
            });
        });
        describe("value",function(){
            it("should throw Error('Value must be a non-negative number') if a number is not passed as value",function(){
                let fakeCall = () => {
                    new PaymentPackage('Alex',new Date());
                }
                expect(fakeCall).to.throw();
            });
            it("should throw Error('Value must be a non-negative number') if a number is not passed as value",function(){
                let fakeCall = () => {
                    new PaymentPackage('Alex');
                }
                expect(fakeCall).to.throw();
            });
            it("should throw Error('Value must be a non-negative number') if a negative number is  passed as value",function(){
                let fakeCall = () => {
                    new PaymentPackage('Prova',-2);
                }
                expect(fakeCall).to.throw();
            });
            it("shouldset correct if a valid argument is  passed as name",function(){
               
                let package = new PaymentPackage('akex',2);
              
              expect(package.value).to.be.equal(2);
          });
        });
        describe("success",function(){
            it("should set the correct value that are passed trough the constructor, and set the default state for VAT and active",function(){
                let package =  new PaymentPackage('Prova',2);
                expect(package.name).to.be.equal('Prova');
                expect(package.value).to.be.closeTo(2,0.1);
                expect(package.VAT).to.be.closeTo(20,0.1);
                expect(package.active).to.be.true;
            });
        })
       
    });
    describe("VAT",function(){
        it("should throw error if a non number is passed as argument",function(){
            let package =  new PaymentPackage('Prova',2);
            let fakeCall = () => {
                package.VAT = "Ciao";
            }
            expect(fakeCall).to.throw();
        });
        it("should throw error if a negative number is passed as argument",function(){
            let package =  new PaymentPackage('Prova',2);
            let fakeCall = () => {
                package.VAT = -2;
            }
            expect(fakeCall).to.throw();
        });
        it("should set correct value for VAT if the passed argument is valid",function(){
            let package =  new PaymentPackage('Prova',2);
            package.VAT = 2;
            expect(package.VAT).to.be.equal(2);
        });
    });
    describe("active",function(){
        it("should throw error if a non number is passed as argument",function(){
            let package =  new PaymentPackage('Prova',2);
            let fakeCall = () => {
                package.active = "Ciao";
            }
            expect(fakeCall).to.throw();
        });
       
        it("should set correct value for Active if the passed argument is valid",function(){
            let package =  new PaymentPackage('Prova',2);
            package.active = false;
            expect(package.active).to.be.false;
        });
    });
    describe("toString",function(){
            it("should throw expected output if the status is active",function(){
                let package =  new PaymentPackage('Prova',2);
                let expected = [
                    `Package: Prova`,
                    `- Value (excl. VAT): 2`,
                    `- Value (VAT 20%): ${2 * (1 + 20 / 100)}`
                  ].join('\n');
                expect(package.toString()).to.be.equal(expected);
            });
            it("should throw expected output if the status is active",function(){
                let package =  new PaymentPackage('Prova',2);
                package.active = false;
                let expected = [
                    `Package: Prova (inactive)`,
                    `- Value (excl. VAT): 2`,
                    `- Value (VAT 20%): ${2 * (1 + 20 / 100)}`
                  ].join('\n');
                expect(package.toString()).to.be.equal(expected);
            });
    });

});