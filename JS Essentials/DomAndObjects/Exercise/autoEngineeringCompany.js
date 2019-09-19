  function autoCompany(input){
			let cars = {};
			for(let entry of input){
				entry = entry.split(/ \| /g);
				let make = entry[0];
				let model = entry[1];
				let producedCars = Number(entry[2]);
				if(!cars[make]){
				  cars[make] = {};
				}
				if(!cars[make][model]){
					cars[make][model] = 0;
				}
				
				cars[make][model] = cars[make][model] + producedCars;
				
			}
			let makes = Object.keys(cars);
			for(const make of makes){
				console.log(make);
				let models = Object.keys(cars[make]);
				for(const model of models){
					console.log(`###${model} -> ${cars[make][model]}`);
				}
			}
		}