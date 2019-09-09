 function findEvenElements(arr){
	let evenElements = [] ;
	for(let i = 0 ; i < arr.length ; i++){
		if(i%2 == 0){
			evenElements.push(arr[i]);
		}
	}
	console.log(evenElements.join(" "));
	}