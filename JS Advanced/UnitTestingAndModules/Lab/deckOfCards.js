function printDeckOfCards(cards) {
    cards = cards.map(c => [c.substr(0,c.length-1),c[c.length-1]]);
    
    function createCard(face,suit) {
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
    let result = [];
    for(let c of cards){
        try{
            c = createCard(c[0],c[1]);
            result.push(c.toString());
        }catch(ex){
          
           return `Invalid card: ${c[0]+""+c[1]}`;
        }
    }
    
    return result;
  }

  console.log(printDeckOfCards(['AS', '10D', 'KH', '1C']));
  