class PaymentProcessor {
    constructor(options) {
        this.options = options;
        this.payments = [];
    }
    get options() {
        return this._options;
    }
    set options(option) {

        if (option === undefined || !this.isValidOption(option)) {
            this._options = { types: ['service', 'product', 'other'], precision: 2 };
            return;
        }
        if(!option.hasOwnProperty("types")){
            option.types = ['service', 'product', 'other'];
        }
        if(!option.hasOwnProperty("precision")){
            option.precision = 2
        }
        this._options = option;
    }

    registerPayment(id, name, type, value) {
        if (!this.isValidString(id) || !this.isValidString(name) || !this.isValidType(type) || !this.isValidNumber(value)) {
            throw new Error();
        }
        this.payments.push({ 'id': id, 'name': name, 'type': type, 'value': value.toFixed(this.options.precision) });
    }
    get(id) {
        let payment = this.payments.find(x => x.id == id);
        if (!payment) {
            throw Error();
        }
        return [
            `Details about payment ID: ${payment.id}`,
            `- Name: ${payment.name}`,
            `- Type: ${payment.type}`,
            `- Value: ${payment.value}`,
        ].join("\n")
    }
    isValidString(id) {
        if (typeof id == "string" && id != undefined && id != '') {
            return true;
        }
        return false;
    }
    isValidNumber(value) {
        if (typeof value == "number") {
            return true;
        }
        return false;
    }
    isValidType(type) {
        if (this.options.types.includes(type)) {
            return true;
        }
        return false;
    }
    isValidOption(option) {
        if ((option.hasOwnProperty("types") &&  typeof option.types == "array" ) || (option.hasOwnProperty("precision") && typeof option.precision == "number" && option.precision > 0)) {
            console.log("is valid");
            return true;
        }
        console.log("invalid");
        return false;
    }

}
const generalPayments = new PaymentProcessor({precision : 4});
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.get('0001'));