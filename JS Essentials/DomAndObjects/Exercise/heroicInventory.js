 function heroicInventory(data) {
			let heroes = [];
			for(let entry of data){
				entry = entry.split(/ \/ /g);
				let name = entry[0];
				let level = Number(entry[1]);
				let items = [];
				if(entry.length > 2){
				  items = entry[2].split(/, /g);
				}
				
				let hero = {};
				hero["name"] = name;
				hero["level"] = level;
				hero["items"] = items;
				heroes.push(hero);
			}
			console.log(JSON.stringify(heroes));
        }