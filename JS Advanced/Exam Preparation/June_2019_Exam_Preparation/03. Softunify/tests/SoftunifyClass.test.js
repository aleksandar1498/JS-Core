const expect = require("chai").expect;
const SoftUniFy = require("../SoftunifyClass").SoftUniFy;

describe("Softunify class tests",() => {
    let soft;
    beforeEach(function() {
        soft = new SoftUniFy();
    });
    describe("function presence tests",()=>{
        it("should contain all the functions defined in the document",() => {
            expect(SoftUniFy.prototype.hasOwnProperty("playSong")).to.be.true;
            expect(SoftUniFy.prototype.hasOwnProperty("downloadSong")).to.be.true;
            expect(SoftUniFy.prototype.hasOwnProperty("songsList")).to.be.true;
            expect(SoftUniFy.prototype.hasOwnProperty("rateArtist")).to.be.true;
        });
    });
    describe("accessors default value",() => {
        it("should contain an empty object allSong => {}",() => {
            expect(soft.hasOwnProperty("allSongs")).to.be.true;
            expect(JSON.stringify(soft['allSongs'])).to.be.equal("{}");
        });
    });
    describe("downloadSong(artist, song, lyrics) tests",()=>{
        it("should create a new artist if it does not exists",() => {
            soft.downloadSong("DonKoce","DiplomiteMi","$$$Money$$$Money$$$");
            expect(JSON.stringify(soft.allSongs)).to.be.equal('{"DonKoce":{"rate":0,"votes":0,"songs":["DiplomiteMi - $$$Money$$$Money$$$"]}}')
        });
        it("should add a new song if the artist exists",() => {
            soft.downloadSong("DonKoce","DiplomiteMi","$$$Money$$$Money$$$");
            soft.downloadSong("DonKoce","Izmamnika","$$$PlayBoy$$$Money$$$");
            expect(JSON.stringify(soft.allSongs)).to.be.equal('{"DonKoce":{"rate":0,"votes":0,"songs":["DiplomiteMi - $$$Money$$$Money$$$","Izmamnika - $$$PlayBoy$$$Money$$$"]}}')
        });
        it("should return the current instance of the class Softunify on success",()=>{
            expect(soft.downloadSong("DonKoce","DiplomiteMi","$$$Money$$$Money$$$")).to.be.equal(soft)
        });
    });
    describe("playSong(song) tests",() => {
        it("should play a song if it exists",() => {
            soft.downloadSong("DonKoce","DiplomiteMi","$$$Money$$$Money$$$");
            
            expect(soft.playSong("DiplomiteMi")).to.be.equal('DonKoce:\nDiplomiteMi - $$$Money$$$Money$$$\n')
        });
        it("should play a song from multiple artists if it exists in multiple",() => {
            soft.downloadSong("DonKoce","DiplomiteMi","$$$Money$$$Money$$$");
            soft.downloadSong("DonKoce","DiplomiteMi","$$$Sy$$$Money$$$");
            soft.downloadSong("DonAlex","DiplomiteMi","$$$Money$$$Money$$$");
            expect(soft.playSong("DiplomiteMi")).to.be.equal('DonKoce:\nDiplomiteMi - $$$Money$$$Money$$$\nDiplomiteMi - $$$Sy$$$Money$$$\nDonAlex:\nDiplomiteMi - $$$Money$$$Money$$$\n')
        });
        it("should return 'You have not downloaded a ${song} song yet. Use SoftUniFy's function downloadSong() to change that!'",() => {
            expect(soft.playSong("DiplomiteMi")).to.be.equal('You have not downloaded a DiplomiteMi song yet. Use SoftUniFy\'s function downloadSong() to change that!')
        });
    });
    describe("rateArtist()",()=>{
        it("should return 'The ${artistName} is not on your artist list.' if the artist does not exist",()=>{
            expect(soft.rateArtist("alex",10)).to.be.equal('The alex is not on your artist list.')
        });
        it("should return 0 if the rate is not a number",()=>{
            soft.downloadSong("DonKoce","DiplomiteMi","$$$Money$$$Money$$$");
            expect(soft.rateArtist("DonKoce","asa")).to.be.equal(0)
        });
        it("rateArtist(DonKoce,2) =>  2.00",()=>{
            soft.downloadSong("DonKoce","DiplomiteMi","$$$Money$$$Money$$$");
            expect(soft.rateArtist("DonKoce",2)).to.be.equal(2.00);
        });
        it("rateArtist(DonKoce,2) should increase the rate and the number of votes",()=>{
            soft.downloadSong("DonKoce","DiplomiteMi","$$$Money$$$Money$$$");
            soft.rateArtist("DonKoce",2);
            expect(JSON.stringify(soft.allSongs['DonKoce'])).to.be.equal('{"rate":2,"votes":1,"songs":["DiplomiteMi - $$$Money$$$Money$$$"]}');
        });
    });
});