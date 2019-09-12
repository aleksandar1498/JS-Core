function solve() {
	let inp = document.getElementById("input").value;
	inp = inp.replace(/[^0-1]/g,'')
	let sum = inp.split('').map(x => Number(x)).reduce((a,c) => a+c,0);
	
	while(sum/10 > 1){
		sum = sum.toString().split('').map(x => Number(x)).reduce((a,c) => a+c,0);
	}
	
	
	inp = inp.slice(sum,inp.length-sum);

	let res = [];
	
	for(let i=0;i<inp.length;i+=8){
	res.push(String.fromCharCode(parseInt(inp.slice(i,i+8), 2)));
	}	
	document.getElementById("resultOutput").innerHTML=res.filter(x => x.match(/[a-zA-Z\s]+/g)).join("").trim();

	
}