 function sumOfTowns(input){
		input = input[0].replace(/[^ A-Za-z0-9_]+/g," ").trim().split(/ +/);
	
          let words = {};
		  for(let i = 0 ;i < input.length ; i++){
			if(words[input[i]]){
				words[input[i]]+=1;
				continue;
			}
			words[input[i]]=1;
		  }
		  console.log(JSON.stringify(words));
        }