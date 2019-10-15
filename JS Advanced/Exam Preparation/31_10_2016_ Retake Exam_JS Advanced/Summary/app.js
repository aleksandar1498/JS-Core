document.getElementById("generate").addEventListener('click',function(ev){
	let current = ev.target;
	
	let summaryDiv = document.createElement("div");
	summaryDiv.id = "generate";
	
	let h2 = document.createElement("h2");
	h2.innerHTML = "Summary";

	let p = document.createElement("p");
	p.innerHTML = "";
	
	summaryDiv.appendChild(h2);
	summaryDiv.appendChild(p);
	
	
	
	Array.from(document.getElementById("content").getElementsByTagName("strong")).forEach(el => {
		p.innerHTML+=el.innerHTML;
	});
	
	current.parentElement.appendChild(summaryDiv);
});