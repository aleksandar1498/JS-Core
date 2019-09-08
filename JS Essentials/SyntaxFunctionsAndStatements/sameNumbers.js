function repeatingDigits(num) {
 let a = num.toString().split("").map(n => Number(n));
 for(let i=0;i<a.length-1;i++){
	if(a[i] != a[i+1]){
		console.log(false);
		console.log(a.reduce((a,i) => a+i,0));
		return;
	}
 }
 console.log(true);
		console.log(a.reduce((a,i) => a+i,0));
	}