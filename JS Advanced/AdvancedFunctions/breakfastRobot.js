function solution(){
	let recipes = { 
		apple : {carbohydrate : 1 , flavour : 2},
		lemonade : {carbohydrate : 10 , flavour : 20},
		burger : {carbohydrate : 5 , fat : 7 ,flavour : 3},
		eggs : {protein : 5 , fat : 1 , flavour : 1},
		turkey : {protein : 10 ,carbohydrate : 10 ,fat : 10 , flavour : 10},
	}
	let stock = {
		protein : 0,
		carbohydrate : 0,
		fat : 0,
		flavour : 0,
	}
	return function manager(operation){
		operation = operation.split(/\s+/g);
		let typeOperation = operation[0];
		let ingredient = operation[1];
		let quantity = Number(operation[2]);
		switch(typeOperation){
			case "restock":
				stock[ingredient]+=quantity;
				return "Success";
			case "prepare":
				let neededIngs = Object.entries(recipes[ingredient]);
				for(const ing of neededIngs){
					if(stock[ing[0]] < recipes[ingredient][ing[0]]*quantity){
						return "Error: not enough "+ing[0]+" in stock";
					}
				}
				for(const ing of neededIngs){
					stock[ing[0]]-=recipes[ingredient][ing[0]]*quantity;
				}
				return "Success";
			case "report":
				return Array.from(Object.entries(stock)).map(a => a[0]+"="+a[1]).join(" ");
				
			
		}
		return operation;
	}

}