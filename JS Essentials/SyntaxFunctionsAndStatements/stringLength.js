function sumLengths(a,b,c){
	let lengthA=a.length;
	let lengthB=b.length;
	let lengthC=c.length;
	let totLength = lengthA + lengthB + lengthC;
	console.log(totLength);
	console.log(Math.floor(totLength/arguments.length))
}
