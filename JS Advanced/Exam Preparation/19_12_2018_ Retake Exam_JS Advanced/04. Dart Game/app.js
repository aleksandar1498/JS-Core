function dart(){
	let isFirstPlayer = true;
	const firstPlayer = document.getElementById("Home");
	const secondPlayer = document.getElementById("Away");
	document.getElementById("playBoard").addEventListener('click',function(evt){
		console.log(evt.target);
	},true);

}