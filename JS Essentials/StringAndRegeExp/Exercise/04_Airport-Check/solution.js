function solve() {
	let data = document.getElementById("string").value.split(' , ');
 let reg = /.*?(?<name> [A-Z][a-z]*\-[A-Z][a-z]*(\.[A-Z][a-z]*)? ).*?(?<airport> [A-Z]{3}\/[A-Z]{3} ).*?(?<flight> [A-Z]{1,3}[0-9]{1,5} ).*?(?<company>\- [A-Z][a-z]+\*[A-Z][a-z]+ )/;
 let match = data[0].match(reg).groups;
 let typeOutput = data[1];
 let name = match.name.trim().replace(/[\-]/g," ");
 let airport = match.airport.split("/");
 let flight = match.flight.trim();
 let company = match.company.trim().replace(/[\-\*]/g," ").trim();
 let output ;
 switch(typeOutput){
	 case 'name':
		output =`Mr/Ms, ${name}, have a nice flight!`;
		break;
	 case 'flight':
		output =`Your flight number ${flight} is from ${airport[0].trim()} to {airport[1].trim()}.`;
		break;
	 case 'company':
		output =`Have a nice flight with ${company}.`;
		break;
	 case 'all':
		output =`Mr/Ms, ${name}, your flight number ${flight} is from ${airport[0].trim()} to ${airport[1].trim()}. Have a nice flight with ${company}.`;
		break;
 }
 document.getElementById("result").innerHTML = output;

}