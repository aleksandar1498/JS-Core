 function sumOfTowns(input){
          let towns = {};
		  for(let i = 0 ;i < input.length ; i+=2){
			if(towns[input[i]]){
				towns[input[i]]+=Number(input[i+1]);
				continue;
			}
			towns[input[i]]=Number(input[i+1]);
		  }
		  console.log(JSON.stringify(towns));
        }