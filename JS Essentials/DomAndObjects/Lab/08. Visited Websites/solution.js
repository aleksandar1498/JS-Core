function solve() {
	let links = document.getElementsByClassName("link-1");
	for(let i = 0 ; i < links.length ; i++){
		links[i].addEventListener("click", function() {
		
		let p = this.getElementsByTagName("p")[0];
		let count = Number(p.textContent.replace(/[^0-9]+/gi,""));
		count++;
		p.textContent = p.textContent.replace(/[0-9]+/gi,count+"");
		
	});
	}
	
}