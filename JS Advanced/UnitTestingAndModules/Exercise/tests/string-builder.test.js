const expect = require("chai").expect;
const StringBuilder = require("../string-builder").StringBuilder;
describe("StringBuilder", function () {
    describe("Constructor", function () {
        it("It should set set an empty array if nothing is passed", function () {
            let builder = new StringBuilder();
            expect(builder._stringArray).to.be.an('array').that.is.empty;
        });
        it("It should set set an array of the passedString", function () {
            let builder = new StringBuilder("alex");
            expect(builder._stringArray).to.be.include.members(['a', 'l', 'e', 'x']);
        });
        it("It should throw error if an argument that is not a String is passed", function () {
            let error = new TypeError('Argument must be string');
            let construcorFake = function () {
                new StringBuilder(Date.now());
            };
            expect(construcorFake).to.throw();
        });
    });
    describe("Append",function(){
        it("should throw exception if nothing is passed",function(){
            let builder = new StringBuilder("alex");
            let fakeCall = function () {
                builder.append();
            };
            expect(fakeCall).to.throw();
        });
        it("should throw exception if an argument different from string is passed",function(){
            let builder = new StringBuilder("alex");
            let fakeCall = function () {
                builder.append(new Date());
            };
            expect(fakeCall).to.throw();
        });
        it("should append to the end the passed string",function(){
            let builder = new StringBuilder("al");
            builder.append("ex");
            expect(builder._stringArray).to.include.members(['a','l','e','x']);
        });
        it("should not change when appended an empty string",function(){
            let builder = new StringBuilder("al");
            builder.append("");
            expect(builder._stringArray).to.include.members(['a','l']);
        });
    });
    describe("Prepend",function(){
        it("should throw exception if nothing is passed",function(){
            let builder = new StringBuilder("alex");
            let fakeCall = function () {
                builder.prepend();
            };
            expect(fakeCall).to.throw();
        });
        it("should throw exception if an argument different from string is passed",function(){
            let builder = new StringBuilder("alex");
            let fakeCall = function () {
                builder.prepend(new Date());
            };
            expect(fakeCall).to.throw();
        });
        it("should prepend the passed string",function(){
            let builder = new StringBuilder("al");
            builder.prepend("ex");
            expect(builder._stringArray).to.include.members(['x','e','a','l']);
        });
        it("should not change when appended an empty string",function(){
            let builder = new StringBuilder("al");
            builder.prepend("");
            expect(builder._stringArray).to.include.members(['a','l']);
        });
    });

    describe("Insert At",function(){
        let builder;
        // beforeEach is executed before the tests in this block
        // before is executed before all the tests no matter where it is located
        beforeEach(function(){
            builder = new StringBuilder("Alex");
        });
        it("should throw exception if nothing is passed",function(){
           
            let fakeCall = function () {
                builder.insertAt();
            };
            expect(fakeCall).to.throw();
        });
        it("should throw exception if an argument different from string is passed",function(){
           
            let fakeCall = function () {
                builder.insertAt(new Date());
            };
            expect(fakeCall).to.throw();
        });
        it("should add to the end if a date is set as starting index is passed",function(){
           builder.insertAt("sash",new Date());
           expect(builder._stringArray).to.include.members([ 'A', 'l', 'e', 'x', 's', 'a', 's', 'h' ]);
        });
        it("should add at the beginning if an object is passed as starting index is passed",function(){
            builder.insertAt("sash",{});
            expect(builder._stringArray).to.include.members([ 's', 'a', 's', 'h', 'A', 'l', 'e', 'x' ]);
         });
         it("should add at the beginning if an array is passed as starting index is passed",function(){
            builder.insertAt("sash",[1,2,3]);
            expect(builder._stringArray).to.include.members([ 's', 'a', 's', 'h', 'A', 'l', 'e', 'x' ]);
         });
         it("should add at the beginning if a string is passed as starting index is passed",function(){
            builder.insertAt("sash","provas");
            expect(builder._stringArray).to.include.members([ 's', 'a', 's', 'h', 'A', 'l', 'e', 'x' ]);
         });
         it("should start counting from the end if a negative number passed as starting index is passed",function(){
            builder.insertAt("sash",-1);
            expect(builder._stringArray).to.include.members(['A', 'l', 'e', 's', 'a', 's', 'h','x' ]);
         });
         it("should insert in the correct position if positive number passed as starting index is passed",function(){
            builder.insertAt("sash",1);
            expect(builder._stringArray).to.include.members(['A', 's', 'a', 's', 'h', 'l', 'e','x' ]);
         });
         it("should insert at the end if  an index more then the length is passed as starting index is passed",function(){
            builder.insertAt("sash",10);
            expect(builder._stringArray).to.include.members(['A',  'l', 'e','x', 's', 'a', 's', 'h']);
         });
    });
    describe("Remove",function(){
        beforeEach(function(){
            builder = new StringBuilder("Alex");
        });
        it("should remove from the end if negative starting index is passed",function(){
            builder.remove(-1,10);
            expect(builder._stringArray).to.include.members(['A',  'l', 'e']);
        });
        it("should remove from the beginning if the starting index is a string",function(){
            builder.remove("ciao",1);
            expect(builder._stringArray).to.include.members([  'l', 'e','x']);
        });
        it("should remove from the beginning if the starting index is an object",function(){
            builder.remove({},1);
            expect(builder._stringArray).to.include.members(['l', 'e','x']);
        });
        it("should not remove nothing if the starting index is a date",function(){
            builder.remove(new Date(),1);
            expect(builder._stringArray).to.include.members(['A','l', 'e','x']);
        });

        it("should not remove if negative length is passed",function(){
            builder.remove(1,-1);
            expect(builder._stringArray).to.include.members(['A',  'l', 'e','x']);
        });
        it("should remove only one element is the length is passed as string",function(){
            builder.remove(0,"");
            expect(builder._stringArray).to.include.members([  'l', 'e','x']);
        });
        it("should remove only one element is the length is passed as object",function(){
            builder.remove(0,{});
            expect(builder._stringArray).to.include.members(['l', 'e','x']);
        });
        it("should remove multiple if the length is passed as string",function(){
            builder.remove(0,new Date());
            expect(builder._stringArray).to.include.members([]);
        });
        it("should remove correct if both params are correct",function(){
            builder.remove(1,3);
            expect(builder._stringArray).to.include.members(['A']);
        })
        
    });
    describe("Verify param",function(){
        it("should throw error if nothing is passed as argument",function(){
            let fakeCall = function () {
                StringBuilder._vrfyParam();
            };
            expect(fakeCall).to.throw();
        });
        it("should throw error if a date is passed as argument",function(){
            let fakeCall = function () {
                StringBuilder._vrfyParam(new Date());
            };
            expect(fakeCall).to.throw();
        });
        it("should throw error if an array is passed as argument",function(){
            let fakeCall = function () {
                StringBuilder._vrfyParam([1,2,3]);
            };
            expect(fakeCall).to.throw();
        });
        it("should not throw nothing if a string is passed as argument",function(){
            let fakeCall = function () {
                StringBuilder._vrfyParam("ciao");
            };
            expect(fakeCall).to.not.throw();
        });
        it("should not throw nothing if an empty string is passed as argument",function(){
            let fakeCall = function () {
                StringBuilder._vrfyParam("ciao");
            };
            expect(fakeCall).to.not.throw();
        });
    });
    describe("To String",function(){
        let builder;
        beforeEach(function(){
            builder  = new StringBuilder();
        })
        it("should return an empty string if the string array is empty",function(){
            expect(builder.toString()).to.be.a('string').that.is.empty;
        })
        it("should return a string if the string array is not empty",function(){
            builder.append("alex")
            expect(builder.toString()).to.be.a('string').that.is.equal("alex");
        })
    });
})