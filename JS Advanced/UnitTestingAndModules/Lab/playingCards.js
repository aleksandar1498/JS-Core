function cardFactory(face, suit) {
    const validFaces = ["2", " 3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const validSuits = [
        { "S" :"\u2660"},
        { "H" :"\u2665"},
        { "D" :"\u2666"},
        { "C" :"\u2663"}
    ];
    if (!validFaces.includes(face) || !validSuits.find(x => Object.keys(x)[0] == suit)) {
        throw new Error("Error");
    }
  
    return {
        face: face,
        suit: suit,
        toString: function () {
            return face+""+validSuits.find(x => Object.keys(x)[0] == suit)[suit];
        }
    }
}
console.log(cardFactory("A","Hs").toString());