
function addDestination(){
	
	let inputs = document.getElementsByTagName("input");
	let seasonElement = document.getElementById("seasons");
	let city = inputs[0];
	let country = inputs[1];
	let season = seasonElement.value
	
	if(city.value && country.value && season){
		addToTable(createRow(`${city.value}, ${country.value}`,season));
		increaseSeason(season);
		city.value = '';
		seasonElement.value = '';
		country.value = '';
	}
	
	function addToTable(row){
		document.getElementById('destinationsList').appendChild(row);
	}
	function increaseSeason(season){
		
		document.getElementById(`${season}`).value = Number(document.getElementById(`${season}`).value)+1;
	}
	function createRow(destination,season){
		let row = document.createElement('tr');
		
		let destinationCol = document.createElement('td');
		destinationCol.textContent = destination;
		
		let seasonCol = document.createElement('td');
		seasonCol.textContent = season.charAt(0).toUpperCase()+season.substr(1);
		
		row.appendChild(destinationCol);
		row.appendChild(seasonCol);
		
		return row;
	}
}