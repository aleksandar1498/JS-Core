function toLowerCase(sentence){
	console.log(sentence.replace(/[\W]+/gi, " ").trim().split(" ").map(a => a.toUpperCase()).join(", "));
}