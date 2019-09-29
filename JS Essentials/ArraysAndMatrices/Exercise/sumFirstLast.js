function sumFirstLast(arr){
	arr = arr.map(Number);
	return arr[0] + arr[arr.length-1];
}
console.log(sumFirstLast(['20', '30', '40']));