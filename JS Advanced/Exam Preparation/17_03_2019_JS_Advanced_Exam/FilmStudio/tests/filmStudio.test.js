const expect = require("chai").expect;
const FilmStudio = require("../filmStudio").FilmStudio;
describe("FilmStudio class tests", () => {
    let studio;
    beforeEach(() => {
        studio = new FilmStudio("Western");
    })
    describe("class structure tests", () => {
        it("Should contain all the functions", () => {
            expect(FilmStudio.prototype.hasOwnProperty("casting")).to.be.true;
            expect(FilmStudio.prototype.hasOwnProperty("makeMovie")).to.be.true;
            expect(FilmStudio.prototype.hasOwnProperty("lookForProducer")).to.be.true;
        });
        it("Should initialize all the variables", () => {
            expect(studio.hasOwnProperty("name")).to.be.true;
            expect(studio.hasOwnProperty("films")).to.be.true;
            expect(studio.films).to.be.an('array').that.is.empty;
        })
    });
    describe("makeMovie(filmName, roles)", () => {
        it("should throw 'Invalid arguments count' if not all parameters were passed", () => {
            let fakeCallZeroParams = () => { studio.makeMovie() };
            let fakeCallOneParam = () => { studio.makeMovie("alex") };
            expect(fakeCallOneParam).to.throw('Invalid arguments count');
            expect(fakeCallZeroParams).to.throw('Invalid arguments count');
        });
        it("should throw 'Invalid arguments' if the passed argument are not of the expected type", () => {
            let fakeCallWithInvalidFirstParam = () => { studio.makeMovie(122, [1, 2, 3]) };
            let fakeCallWithInvalidSecondParam = () => { studio.makeMovie('Alex', -1) };
            expect(fakeCallWithInvalidSecondParam).to.throw('Invalid arguments');
            expect(fakeCallWithInvalidFirstParam).to.throw('Invalid arguments');
        });
        it("should create an instance of the film with his roles an add it to the film array", () => {
            expect(JSON.stringify(studio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']))).to.be.equal('{"filmName":"The Avengers","filmRoles":[{"role":"Iron-Man","actor":false},{"role":"Thor","actor":false},{"role":"Hulk","actor":false},{"role":"Arrow guy","actor":false}]}');
            expect(JSON.stringify(studio.films)).to.be.equal('[{"filmName":"The Avengers","filmRoles":[{"role":"Iron-Man","actor":false},{"role":"Thor","actor":false},{"role":"Hulk","actor":false},{"role":"Arrow guy","actor":false}]}]');
        });
        it("if there is an already existing film with that name , simply make it part of a series ", () => {
            studio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            expect(JSON.stringify(studio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']))).to.be.equal('{"filmName":"The Avengers 2","filmRoles":[{"role":"Iron-Man","actor":false},{"role":"Thor","actor":false},{"role":"Hulk","actor":false},{"role":"Arrow guy","actor":false}]}');
        })
    });
    describe("casting(actor,role) tests", () => {
        it("should return 'There are no films yet in ${this.name}.' if films is empty",()=>{
            expect(studio.casting("Leo","police")).to.be.equal('There are no films yet in Western.')
        });
        it("should return '${actor}, we cannot find a ${role} role....' if this role is not present",()=>{
            studio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            expect(studio.casting("Leo","police")).to.be.equal('Leo, we cannot find a police role...')
        });
        it("should return '${actor}, we cannot find a undefined role....' if we pass only the name of the actor",()=>{
            studio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            expect(studio.casting("Leo")).to.be.equal('Leo, we cannot find a undefined role...')
        });
        it("should return 'undefined, we cannot find a undefined role....' if we pass zero args",()=>{
            studio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            expect(studio.casting()).to.be.equal('undefined, we cannot find a undefined role...')
        });
        it("should return 'You got the job! Mr. ${actor} you are next ${role} in the ${f.filmName}. Congratz!' if the role is present",()=>{
            studio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            expect(studio.casting("Leo","Thor")).to.be.equal('You got the job! Mr. Leo you are next Thor in the The Avengers. Congratz!')
        });
    });
    describe("lookForProducer(film)",()=>{
        it("should throw error ${film}  do not exist yet, but we need the money... if the film is not present",()=>{
            let fakeCallOneParam = () =>{
                studio.lookForProducer("Prova");
            }
            let fakeCallZeroParams = () =>{
                studio.lookForProducer();
            }
            expect(fakeCallOneParam).to.throw('Prova do not exist yet, but we need the money...')
            expect(fakeCallZeroParams).to.throw('undefined do not exist yet, but we need the money...')

        });
        it("should return the film data if it exists",()=>{
            studio.makeMovie('The Avengers', ['Iron-Man']);
            expect(studio.lookForProducer("The Avengers")).to.be.equal("Film name: The Avengers\nCast:\nfalse as Iron-Man\n");
            studio.casting('Alex','Iron-Man');
            expect(studio.lookForProducer("The Avengers")).to.be.equal("Film name: The Avengers\nCast:\nAlex as Iron-Man\n");


        });
    });
});