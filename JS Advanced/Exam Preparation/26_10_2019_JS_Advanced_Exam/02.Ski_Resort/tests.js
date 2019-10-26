const expect = require("chai").expect;
let SkiResort = require('./solution');

describe('SkiResort', function () {
    let resort;
    beforeEach(() => {
        resort = new SkiResort("Bansko");
    });
    describe("Structure tests", () => {
        it("should contain all the functions and getters", () => {
            expect(SkiResort.prototype.hasOwnProperty("build")).to.be.true;
            expect(SkiResort.prototype.hasOwnProperty("bestHotel")).to.be.true;
            expect(SkiResort.prototype.hasOwnProperty("book")).to.be.true;
            expect(SkiResort.prototype.hasOwnProperty("leave")).to.be.true;
            expect(SkiResort.prototype.hasOwnProperty("averageGrade")).to.be.true;
        });
        it("should has the default variables", () => {
            expect(resort.name).to.be.equal('Bansko');
            expect(resort.voters).to.be.equal(0);
            expect(resort.hotels).to.be.an('array').that.is.empty;
        });
        it("can change values of variables directly", () => {
            resort.name = 'Pamporovo';
            expect(resort.name).to.be.equal('Pamporovo');
            resort.voters = 10;
            expect(resort.voters).to.be.equal(10);
        });
    });
    describe("best hotel tests", () => {
        it("should return 'No votes yet' if there are not voters", () => {
            expect(resort.bestHotel).to.be.equal('No votes yet');
        })
        it("should return Best hotel is Avenue with grade 10.5. Available beds: 3 if there are registered votes", () => {
            resort.build("Sun", 10);
            resort.build('Avenue', 5);
            resort.book('Sun', 5);
            resort.book('Avenue', 5);
            resort.leave('Sun', 3, 2);
            resort.leave('Avenue', 3, 3);
            resort.book('Avenue', 3);
            resort.leave('Avenue', 3, 0.5);
            expect(resort.bestHotel).to.be.equal('Best hotel is Avenue with grade 10.5. Available beds: 3');
        })
    });
    describe("build(name, beds) tests", () => {
        it("should throw error if invalid hotel name", () => {
            let build = () => resort.build('', 10);
            expect(build).to.throw(Error, 'Invalid input');
        });
        it("should throw error if invalid number of beds", () => {
            let build = () => resort.build('Avenue', -1);
            expect(build).to.throw(Error, 'Invalid input');
        });
        it("should return 'Successfully built new hotel - ${name}' on success", () => {
            expect(resort.build("Avenue", 10)).to.be.equal('Successfully built new hotel - Avenue');
            expect(JSON.stringify(resort.hotels)).to.be.equal('[{"name":"Avenue","beds":10,"points":0}]');
            resort.build("Sun", 10);
            expect(JSON.stringify(resort.hotels)).to.be.equal('[{"name":"Avenue","beds":10,"points":0},{"name":"Sun","beds":10,"points":0}]');

        });

    });
    describe("book(name, beds) tests", () => {
        it("should throw error if invalid hotel name", () => {
            let book = () => resort.book('', 10);
            expect(book).to.throw(Error, 'Invalid input');
        });
        it("should throw error if invalid number of beds", () => {
            let book = () => resort.book('Avenue', -1);
            expect(book).to.throw(Error, 'Invalid input');
        });
        it("should throw error if there is no such hotel", () => {
            let book = () => resort.book('Sun', 2);
            expect(book).to.throw(Error, 'There is no such hotel');
        });
        it("should throw error if there are no free beds", () => {
            resort.build('Sun', 3);
            let book = () => resort.book('Sun', 10);
            expect(book).to.throw(Error, 'There is no free space');
        });
        it("should return 'Successfully booked' if valid",()=>{
            resort.build('Avenue', 7);
            expect(resort.book('Avenue', 5)).to.be.equal('Successfully booked');
        });
    });
    describe("leave tests", () => {
        it("should throw error if invalid hotel name", () => {
            let leave = () => resort.leave('', 10, 10);
            expect(leave).to.throw(Error, 'Invalid input');
        });
        it("should throw error if invalid number of beds", () => {
            let leave = () => resort.leave('Avenue', -1, 10);
            expect(leave).to.throw(Error, 'Invalid input');
        });
        it("should throw error if there is no such hotel", () => {
            let leave = () => resort.leave('Sun', 2, 10);
            expect(leave).to.throw(Error, 'There is no such hotel');
        });
        it("should return success message ${beds} people left ${name} hotel", () => {
            resort.build("Sun", 10);
            resort.build('Avenue', 5);
            resort.book('Sun', 5);
            resort.book('Avenue', 5);
            expect(resort.leave('Sun', 3, 2)).to.be.equal('3 people left Sun hotel');
        });
        it("should increase the points on success ", () => {
            resort.build("Sun", 10);
            resort.build('Avenue', 5);
            resort.book('Sun', 5);
            resort.book('Avenue', 5);
            resort.leave('Sun', 3, 2);
            expect(JSON.stringify(resort.hotels)).to.be.equal('[{"name":"Sun","beds":8,"points":6},{"name":"Avenue","beds":0,"points":0}]');
        });
    });
    describe("averageGrade() tests",()=>{
        it("should return 'No votes yet' if there are not voters",()=>{
            expect(resort.averageGrade()).to.be.equal('No votes yet');
        });
        it("should return 'Average grade: 1.83' on correct ",()=>{
            resort.build("Sun", 10);
            resort.build('Avenue', 5);
            resort.book('Sun', 5);
            resort.book('Avenue', 5);
            resort.leave('Sun', 3, 2);
            resort.leave('Avenue', 3, 3);
            resort.book('Avenue', 3);
            resort.leave('Avenue', 3, 0.5);
            expect(resort.averageGrade()).to.be.equal('Average grade: 1.83');
        });
    })

});
