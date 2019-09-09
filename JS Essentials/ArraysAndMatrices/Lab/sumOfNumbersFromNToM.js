function sumInRange(a,b){
	let start = Number(a);
	let end = Number(b);
	let sum = 0 ;
	for(let i = start ; i <= end ; i++){
		sum+= i;
	}
	console.log(sum);

}