function gcd(a,b) {
  let divA = divisors(a);
  let divB = divisors(b);
  
  for(let j = divA.length-1; j >= 0 ; j--){
	for(let k = divB.length-1; k >= 0 ; k--){
		if(divA[j] == divB[k]){
		 console.log(divA[j]);
		 return
		}
	}
  }
  function divisors(num){
let count = 1;
  	let divs = [];
	while(count <= num){
		if(num%count == 0){
			divs.push(count);
		}
		count++;
	}
  	return divs;
  }
}