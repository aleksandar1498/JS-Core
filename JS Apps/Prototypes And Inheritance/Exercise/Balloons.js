function solve() {
    const Balloon = function Balloon(color, gasWeight) {
        this.color = color;
        this.gasWeight = gasWeight;
    }
   
    const PartyBalloon =  function PartyBalloon(color, gasWeight, ribbonColor, ribbonLength) {
        Balloon.call(this,color,gasWeight);
        this._ribbon = {"color":ribbonColor, "length":ribbonLength};
    }
    /*class Balloon {
        constructor(color, gasWeight) {
            this.color = color;
            this.gasWeight = gasWeight;
        }
    }
    class PartyBalloon extends Balloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength) {
            super(color, gasWeight);
            this._ribbon = {"color":ribbonColor, "length":ribbonLength};
        }
        get ribbon(){
            return this._ribbon;
        }
      
    }
    class BirthdayBalloon extends PartyBalloon{
        constructor(color, gasWeight, ribbonColor, ribbonLenght,txt) {
            super(color, gasWeight,ribbonColor, ribbonLenght);
            this._text = txt;
        }
        get text(){
            return this._text;
        }
    }*/
    return {
        Balloon: Balloon,
        PartyBalloon: PartyBalloon,
        BirthdayBalloon: BirthdayBalloon
    }
}
let s = solve();
let b = new s.PartyBalloon("gre", 12, "sdas", 123);
console.log(b.text);