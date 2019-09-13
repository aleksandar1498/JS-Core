function solve() {
	let data = document.getElementById("string").value;
 let reg = /.*?(?<name> [A-Z][a-z]*\-[A-Z][a-z]*(\.[A-Z][a-z]*)? ).*?(?<airport> [A-Z]{3}\/[A-Z]{3} ).*?(?<flight> [A-Z]{1,3}[0-9]{1,5} ).*?(?<company>\- [A-Z][a-z]+\*[A-Z][a-z]+ )/;
 let match = data.match(reg).groups;
 console.log(match.name);
}