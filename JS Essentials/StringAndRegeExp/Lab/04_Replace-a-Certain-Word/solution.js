function solve() {
 let replacingWord = document.getElementById("word").value;
 let content = document.getElementById("text").value;
 console.log(replacingWord);
 let words = JSON.parse(content);
 let wordToReplace =words[0].split(/\s+/)[2];
 let pattern = new RegExp(""+wordToReplace+"","gi");
 let result = document.getElementById("result");
 for(let word of words){
	let p = document.createElement("p");
	p.innerHTML = word.replace(pattern,replacingWord);
	result.appendChild(p);
}


}