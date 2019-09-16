function attachEventsListeners() {
let daysBtn = document.getElementById("daysBtn");
let hoursBtn = document.getElementById("hoursBtn");
let minutesBtn = document.getElementById("minutesBtn");
let secondsBtn = document.getElementById("secondsBtn");
daysBtn.addEventListener("click",function(ev){
	let days = Number(ev.target.previousElementSibling.value);
	hoursBtn.previousElementSibling.value = days * 24;
	minutesBtn.previousElementSibling.value = days * 24 * 60;
	secondsBtn.previousElementSibling.value = days * 24 * 60 * 60;
});

hoursBtn.addEventListener("click",function(ev){
	let hours = Number(ev.target.previousElementSibling.value);
	console.log(hours / 24);
	daysBtn.previousElementSibling.value = (hours / 24);
	minutesBtn.previousElementSibling.value = hours * 60;
	secondsBtn.previousElementSibling.value = hours * 60 * 60;
});

minutesBtn.addEventListener("click",function(ev){
	let minutes = Number(ev.target.previousElementSibling.value);
	daysBtn.previousElementSibling.value = (minutes / (24*60)).toFixed(0);
	hoursBtn.previousElementSibling.value = (minutes / 60).toFixed(0);
	secondsBtn.previousElementSibling.value = minutes * 60;
});

secondsBtn.addEventListener("click",function(ev){
	let seconds = Number(ev.target.previousElementSibling.value);
	daysBtn.previousElementSibling.value = (seconds / (3600*24)).toFixed(0);
	hoursBtn.previousElementSibling.value = (seconds / 3600).toFixed(0);
	minutesBtn.previousElementSibling.value = (seconds / 60).toFixed(0);
	
});
}