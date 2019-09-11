function solve() {
	let content = document.getElementById("text").value;
	content = content.trim().split(/\s+/g);
	console.log(content);
	let result = document.getElementById("result");
	
	let resultWord ="";
	for(const word of content){
		if(isNaN(Number(word))){
			let encodings = word.split('');
			for(let i=0;i<encodings.length;i++){
				encodings[i] = encodings[i].charCodeAt(0);
			}
			let p = document.createElement("p");
			p.innerHTML+=`${encodings.join(" ")}`;
			result.appendChild(p);
			
		}else{
			resultWord+=String.fromCharCode(Number(word));
		}
	}
	let p = document.createElement("p");
	p.innerHTML+=resultWord;
	result.appendChild(p);
}