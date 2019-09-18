  function lowestPricePerProduct(cities) {
           let products = {};
		   for(let city of cities){
			city = city.split(/ \| /g);
			let cityName = city[0];
			let product = city[1];
			let price = Number(city[2]);
			if(products[product]){
				if(products[product][cityName]){
					products[product][cityName]["price"] = price;
				}else{
					products[product][cityName]= {};
					products[product][cityName]["price"] = price;
				}
			}else{
				products[product] = {};
				products[product][cityName]= {};
				products[product][cityName]["price"] = price;
			}
		   }
		   
		   const productNames = Object.keys(products);
		   for(const key of productNames){
			let cheaperCity = Object.entries(products[key]).sort((a,b) => {
				//console.log(a[1]['price'],b[1]['price'])
				return a[1]['price'] - b[1]['price'];
			})[0];
			
			console.log(`${key} -> ${cheaperCity[1]["price"]} (${cheaperCity[0]})`);
			
			
		   }
		   

        }