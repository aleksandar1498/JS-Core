 function matrixToJSON(input){
          
		  let city = {};
		  for(let j = 0 ; j < input.length ; j++){
	
			
			input[j] = input[j].split(/ <-> /);
			if(city[input[j][0]]){
				city[input[j][0]]+=Number(input[j][1]);
				continue;
			}
			city[input[j][0]]=Number(input[j][1]);
		
			
			
		  }
			let keys = Object.keys(city);
			for(let key of keys){
			console.log(`${key} : ${city[key]}`);
			}
			
		  
		 
        }