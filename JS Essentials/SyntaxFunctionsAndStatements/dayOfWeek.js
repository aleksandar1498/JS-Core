function getDayOfWeekByName(day){
	let days = {"Monday":1,"Tuesday":2,"Wednesday":3,"Thursday":4,"Friday":5,"Saturday":6,"Sunday":7};
	if(typeof days[day] === 'undefined'){
		console.log("error");
		return;
	}
	console.log(days[day]);
}