let solution =(function(){
	const add = (vec1,vec2) => [(vec1[0]+vec2[0]),(vec1[1]+vec2[1])];
	const multiply = (vec1,scalar) => [(vec1[0]*scalar),(vec1[1]*scalar)];
	const length = (vec1) => Math.sqrt(vec1[0]**2 + vec1[1]**2);
	const dot = (vec1,vec2) => vec1[0]*vec2[0] + vec2[1]*vec1[1];
	const cross = (vec1,vec2) => vec1[0]*vec2[1] - vec1[1]*vec2[0];
		return {
			add,
			multiply,
			length,
			dot,
			cross
		}
	
})();