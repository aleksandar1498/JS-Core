function firstAndLastKNumber(arr){
		let number = Number(arr[0]);
		let newArr = arr.slice(1,arr.length);
		console.log(newArr.slice(0,number));
		console.log(newArr.slice(newArr.length-number,newArr.length));
	}