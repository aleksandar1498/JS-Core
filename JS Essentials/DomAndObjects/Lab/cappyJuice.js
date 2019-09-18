 function cappyJuice(input){
			let notBottledJuices = {};
			let bottledJuice = {};
			for(let entry of input){
				entry = entry.split(/ => /g);
				let name = entry[0];
				let quantity = Number(entry[1]);
				if(notBottledJuices[name]){
					notBottledJuices[name] = notBottledJuices[name] + quantity;
				}else{
					notBottledJuices[name] = quantity;
				}
				if(notBottledJuices[name] >= 1000){
					if(bottledJuice[name]){
						bottledJuice[name]+=Math.floor(notBottledJuices[name]/1000);
					}else{
						bottledJuice[name]=Math.floor(notBottledJuices[name]/1000);
					}
					notBottledJuices[name] = notBottledJuices[name]%1000;
				}
				
			}
			let juiceNames = Object.keys(bottledJuice);
			for(const juice of juiceNames){
					console.log(`${juice} => ${bottledJuice[juice]}`);
			}
			
		}