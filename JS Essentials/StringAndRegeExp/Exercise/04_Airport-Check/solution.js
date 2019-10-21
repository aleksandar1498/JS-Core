function solve() {
	let data = document.getElementById("string").value;
	let [str,type] = data.split(', ');
	let name = str.match(/(?:\s)(?<name>[A-Z][A-Za-z]*\-[A-Z][A-Za-z]*(\.\-[A-Z][A-Za-z]*)?)(?:\s)/gi)[0].trim().replace(/[\-]+/g, " ");
	let airport = str.match(/(?:\s)[A-Z]{3}\/[A-Z]{3}(?:\s)/gi)[0].trim().split("/");
	let flight = str.match(/(?<flight>(?:\s)[A-Z]{1,3}[0-9]{1,5}(?:\s))/gi)[0].trim();
	let company = str.match(/(?<company>\-\s[A-Z][A-Za-z]*\*[A-Z][A-Za-z]*\s)/gi)[0].trim().replace(/\-/g, " ").replace(/\*/g, " ").trim();
	let output;
	switch (type) {
		case 'name':
			output = `Mr/Ms, ${name}, have a nice flight!`;
			break;
		case 'flight':
			output = `Your flight number ${flight} is from ${airport[0].trim()} to ${airport[1].trim()}.`;
			break;
		case 'company':
			output = `Have a nice flight with ${company}.`;
			break;
		case 'all':
			output = `Mr/Ms, ${name}, your flight number ${flight} is from ${airport[0].trim()} to ${airport[1].trim()}. Have a nice flight with ${company}.`;
			break;
	}
	document.getElementById("result").textContent = output;

}