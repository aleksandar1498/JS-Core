function solve() {
 let content = document.getElementById("input");
 let output = document.getElementById("output");
 let sentences = content.innerHTML.replace(/\.$/g,"").split(/\./).filter(sentence => sentence.length > 0);
 console.log(sentences);
 for(let i=0;i < sentences.length;i+=3){
	 let paragraph = document.createElement("p");
	 if(i+2 < sentences.length){
		paragraph.innerHTML = sentences.slice(i,i+3);
	 }else{
		paragraph.innerHTML = sentences.slice(i,sentences.length);
	 }
	 output.appendChild(paragraph);
 }

}