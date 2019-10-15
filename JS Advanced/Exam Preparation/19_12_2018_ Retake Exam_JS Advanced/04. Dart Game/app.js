function dart(){
	let tableOfPoints = mapTable();
	let isFirstPlayer = true;
	const firstPlayer = document.getElementById("Home");
	const secondPlayer = document.getElementById("Away");
	const turns = document.getElementById("turns").children;
	let currentPlayer = turns[0];
	let nextPlayer = turns[1];
	document.getElementById("playBoard").addEventListener('click',playDarts,true);
	function playDarts(evt){
		if(isFirstPlayer){
			signPoints(firstPlayer,tableOfPoints[evt.target.id]);
			currentPlayer.innerHTML = currentPlayer.innerHTML.replace(/(Away|Home)/gi,"Away");
			nextPlayer.innerHTML = nextPlayer.innerHTML.replace(/(Away|Home)/gi,"Home");
			isFirstPlayer = false;
		}else{
			signPoints(secondPlayer,tableOfPoints[evt.target.id]);
			currentPlayer.innerHTML = currentPlayer.innerHTML.replace(/(Away|Home)/gi,"Home");
			nextPlayer.innerHTML = nextPlayer.innerHTML.replace(/(Away|Home)/gi,"Away");
			isFirstPlayer = true;
		}
	}
	function signPoints(player,points){
		let currentPointsElement = player.getElementsByTagName("p")[0];
		console.log(currentPointsElement.innerHTML);
		let currentPoints = Number(currentPointsElement.innerHTML);
		currentPoints+=points;
		checkWinner(player,currentPoints);
		currentPointsElement.innerHTML = currentPoints;
	}
	function mapTable(){
		let laye = ["firstLayer","secondLayer","thirdLayer","fourthLayer","fifthLayer","sixthLayer"];
		let points = {};
		let tableBody = document.getElementsByTagName("tbody")[0];
		let rows = tableBody.children;
		for(let i=0;i< rows.length ;i++){
			let data = rows[i].children;
			let p= parseInt(data[1].innerHTML);
			points[laye[i]] = p;
		}
		return points;
	}
	function checkWinner(player,currentPoints){
		let playerName = player.getElementsByTagName("p")[1].innerHTML;
		
		if(currentPoints >= 100){
			document.getElementById("playBoard").removeEventListener('click',playDarts,true);
			player.getElementsByTagName("p")[1].style.backgroundColor = 'green';
			if(playerName == "Home"){
				secondPlayer.getElementsByTagName("p")[1].style.backgroundColor = 'red';
			}else{
				firstPlayer.getElementsByTagName("p")[1].style.backgroundColor = 'red';
			}
		}
	}
}