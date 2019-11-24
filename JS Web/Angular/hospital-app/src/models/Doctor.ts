export class Doctor {
    _id: number;
    name: string;
    rating: number;
    active: boolean;

    constructor(id: number, name: string, rating: number, active: boolean) {
        this._id = id;
        this.name = name;
        this.rating = rating;
        this.active = active;
    }
    toggleStatus(){
        this.active = !this.active;
    }
}