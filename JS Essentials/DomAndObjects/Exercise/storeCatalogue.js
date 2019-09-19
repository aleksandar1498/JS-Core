 function catalogue(input){
			let dictionary = {};
			for(let entry of input){
				entry = entry.split(/ : /g);
				let product = entry[0];
				let price = Number(entry[1]);
				if(!dictionary[product.charAt(0)]){
					dictionary[product.charAt(0)] = {};	
				}
				dictionary[product.charAt(0)][product] = price;
				
			}
			let keys = Object.keys(dictionary);
			keys.sort((a,b) => a.localeCompare(b));
			for(const letter of keys){
				console.log(letter);
				let productKeys = Object.keys(dictionary[letter]);
				productKeys.sort((a,b) => a.localeCompare(b));
				for(let productKey of productKeys){
					console.log(` ${productKey}: ${dictionary[letter][productKey]}`);
				}
			}
			
		}