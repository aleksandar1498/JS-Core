function complete(orders) {
			let totIncome = 0;
			
			for(let order of orders){
				order = order.split(", ");
				let totPrice = 0;
				let budget = Number(order[0]);
				let typeOrder = order[1];
				let sugarQuantity = order[order.length-1];
				switch(typeOrder){
					case "coffee":
						if(order[2] == 'caffeine'){
							totPrice=0.80;
						}else if(order[2] == 'decaf'){
							totPrice=0.90;
						}
						if(order[3] == 'milk'){
							totPrice+=0.1;
						}
						break;
					case "tea":
						totPrice=totPrice+0.80;
						if(order[2] == 'milk'){
							totPrice+=0.1;
						}
						break;
				}
				
				if(sugarQuantity > 0 && sugarQuantity <= 5){
					totPrice+=0.1;
				}
				
				if(budget >= totPrice){
					console.log(`You ordered ${typeOrder}. Price: $${totPrice.toFixed(2)} Change: $${(budget-totPrice).toFixed(2)}`);
					totIncome+=totPrice;
				}else{
					console.log(`Not enough money for ${typeOrder}. Need $${(totPrice-budget).toFixed(2)} more.`);
				}
				
			}
			console.log(`Income Report: $${totIncome.toFixed(2)}`);
		}