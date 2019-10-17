<script>
class Vacation{
	constructor(organizer, destination, budget){
		this.organizer = organizer;
		this.destination = destination;
		this.budget = budget;
		this.kids = {} ;
	}
	
	registerChild(name, grade, budget){
		if(budget < this.budget){
			return `${name}'s money is not enough to go on vacation to ${this.destination}.`'
		}
		if(!Object.keys(this.kids).includes(grade)){
			this.kids[grade] = [];
		}
		if(this.kids[grade].find(x => {
			x = x.split('\-')[0];
			return x == name;
		})){
			return `${name} is already in the list for this ${destination} vacation.`;
		}
		this.kids[grade].push(`${name}-${budget}`);
		
	}
}
let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
console.log(vacation.registerChild('Gosho', 5, 2000));
console.log(vacation.registerChild('Lilly', 6, 2100));
console.log(vacation.registerChild('Pesho', 6, 2400));
console.log(vacation.registerChild('Gosho', 5, 2000));
console.log(vacation.kids);
</script>