function velox(data){
	let speedLimits = {'motorway':130,'interstate':90,'city':50,'residential':20};
	let speed = Number(data[0]);
	let loca= data[1];
	let speeding = speed - speedLimits[loca];
	if(speeding > 0){
		if(speeding <= 20){
			console.log("speeding");
		}else if(speeding <= 40){
			console.log("excessive speeding");
		}else{
			console.log("reckless driving");
		}
	}
	
}