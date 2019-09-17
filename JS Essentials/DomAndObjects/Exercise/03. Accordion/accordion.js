function toggle() {
    let visibility = document.getElementsByClassName("button")[0];
	let content = document.getElementById("extra");
	switch(visibility.innerHTML){
		case "More":
			visibility.innerHTML = "Less";
			content.style.display = "block";
			break
		case "Less":
			visibility.innerHTML = "More";
			content.style.display = "none";
			break;
	}
	
	
}