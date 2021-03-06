function matrixToJSON(input){
          let output = [];
		  let header = []; 
		  for(let j = 0 ; j < input.length ; j++){
			if(j == 0){
				header = input[j].replace(/(^\||\|$)/gi,"").split(/\|/gi).map(h => h.trim());
				continue;
			}
			
			input[j] = input[j].replace(/(^\||\|$)/gi,"").split(/\|/gi);
			let city = {};
			for( let k = 0 ; k < input[j].length;k++){
			   
				if(Number(input[j][k].trim()) || Number(input[j][k].trim()) == 0){
				
				 let num = Number(input[j][k].trim());
				
					if(num-Math.floor(num) > 0.00){
						city[header[k]] = num.toFixed(2);
					}else{
						city[header[k]] = num.toFixed(0);
					}
					
				}else{
					city[header[k]] = input[j][k].trim();
				}
				
			}
			
			
		  
		  output.push(city);
		 
        }
		
		 console.log(JSON.stringify(output).replace(/(\"(?=[\-0-9])|(?<=[\-0-9])\")/gi,""));
	}