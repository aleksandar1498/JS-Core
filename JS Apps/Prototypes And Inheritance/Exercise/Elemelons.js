function solve(){
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.weight = weight;
            this.melonSort = melonSort;
        }
    }
    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = this.weight * this.melonSort.length;
        }
        toString() {
            let result = [];
            result.push(`Element: Water`);
            result.push(`Sort: ${this.melonSort}`);
            result.push(`Element Index: ${this.elementIndex}`);
            return result.join("\n");
        }
    }
    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = this.weight * this.melonSort.length;
        }
        toString() {
            let result = [];
            result.push(`Element: Fire`);
            result.push(`Sort: ${this.melonSort}`);
            result.push(`Element Index: ${this.elementIndex}`);
            return result.join("\n");
        }
    }
    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = this.weight * this.melonSort.length;
        }
        toString() {
            let result = [];
            result.push(`Element: Earth`);
            result.push(`Sort: ${this.melonSort}`);
            result.push(`Element Index: ${this.elementIndex}`);
            return result.join("\n");
        }
    }
    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = this.weight * this.melonSort.length;
        }
        toString() {
            let result = [];
            result.push(`Element: Air`);
            result.push(`Sort: ${this.melonSort}`);
            result.push(`Element Index: ${this.elementIndex}`);
            return result.join("\n");
        }
    }
    class Melolemonmelon extends Airmelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._elements = ['Water', 'Fire', 'Earth', 'Air'];
            this._index = 0;
        }

        morph() {
            return this._elements[this._index++ % this._elements.length];
        }

        toString() {
            let sortIndex = super.toString().indexOf('\n');
            return `Element: ${this.morph()}` + super.toString().slice(sortIndex);
        }
    }
    return { Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon };
}
let melemelon = new Melemelon(12, "prova");
console.log(melemelon.toString());
melemelon.morph();
console.log(melemelon.toString());