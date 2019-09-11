function solve() {
    let textArea = document.getElementById("text").value;
	let splitting = Number(document.getElementById("number").value);
	let result = document.getElementById("result");
	if(textArea.length%splitting != 0){
		let reminder = splitting - textArea.length%splitting;
		textArea+=textArea.substr(0,reminder);
	}
	let splittedWord = [];
		for(let i = 0;i < textArea.length ;i+=splitting){
			splittedWord.push(textArea.substr(i,splitting));
		}
		result.innerHTML = splittedWord.join(" ");
}