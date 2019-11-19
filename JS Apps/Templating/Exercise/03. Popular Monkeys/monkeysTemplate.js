$(() => {
	const monkeyDivTemplate = document.getElementById("monkey-template").innerHTML;
	const monkeysDiv = document.getElementsByClassName("monkeys")[0];
	const template = Handlebars.compile(monkeyDivTemplate);
	for(const monkey of window.monkeys){
		const div = document.createElement("div");
		div.className = "monkey";
		div.innerHTML = template(monkey);
		
		monkeysDiv.appendChild(div);
		monkeysDiv.lastElementChild.getElementsByTagName("button")[0].addEventListener('click',showInfo);
	}
    function showInfo(evt){
		const buttons = evt.target.nextElementSibling;
		
		if(buttons.style.display == 'none'){
			buttons.style.display = 'block'
		}else{
			buttons.style.display = 'none'
		}
	}
})