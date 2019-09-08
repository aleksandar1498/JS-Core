function calculate(a,b,operator){
  	if(b < 0 && operator == '-'){
      console.log(a-b);
      return;
    }
	console.log(eval(`${a}${operator}${b}`));
}