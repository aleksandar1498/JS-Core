function euclid(a,b){
	let r = 0;
	while (b > 0)
	{
		
		r = a % b;	
		a = b;
		b = r;
	}

	return a;
}