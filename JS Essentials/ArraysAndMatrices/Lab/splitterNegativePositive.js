function splitterNegativePositive(arr){
		
		let newArr = [] ;
		for(const element of arr){
			if(element < 0){
				newArr.unshift(element);
			}else{
				newArr.push(element);
			}
		}
		console.log(newArr.join("\n"));
	}