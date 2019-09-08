  function matrixToJSON(input){
          let output = [];
		  let header = []; 
		  for(let j = 0 ; j < input.length ; j++){
			if(j == 0){
				header = input[j].replace(/[|]+/gi,"").trim().split(/ +/);
				continue;
			}
			
			input[j] = input[j].replace(/^\|/gi,"").replace(/\|$/g,"").split(/\|/g);
		
			let city = {};
			for( let k = 0 ; k < input[j].length;k++){
			   
				if(Number(input[j][k]) || Number(input[j][k]) == 0){
				
				 let num = Number(input[j][k]);
				
					if(num-Math.floor(num) > 0.00){
						city[header[k]] = num;
					
				}else{
					city[header[k]] = input[j][k].trim();
					}
				
			}
			output.push(city);
			
		  }
		  console.log(JSON.stringify(output));
        }