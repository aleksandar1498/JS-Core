let navbar = document.getElementsByClassName('navbar-toggler')[0];

for(const service of document.querySelectorAll(".popular_cource a.btn_1")){
	let serviceName = service.parentElement.id;
	//console.log(serviceName+" from button")
	let servicer = document.getElementById(serviceName);
	service.addEventListener('click',function(){
			showService(servicer);
		});
}
document.getElementsByClassName('nav-link')[1].addEventListener('click',hideNavbar);
document.getElementsByClassName('nav-link')[3].addEventListener('click',hideNavbar);
let services = document.getElementById("type-service").getElementsByTagName('a');
for(const service of services){
	let serviceName = service.innerHTML.charAt(0).toLowerCase()+service.innerHTML.substr(1);
	//console.log(serviceName);
	let servicer = document.getElementById(serviceName);
	service.addEventListener('click',function(){
			showService(servicer);
		});
	service.addEventListener('click',hideNavbar);
	
}
function hideNavbar(){
	let icon = navbar.getElementsByClassName("navbar-toggler-icon")[0];
	//console.log(icon.style.display);
	
		navbar.click();
	
}
function showService(serviceToShow){
	console.log(serviceToShow);
	let buttonState = serviceToShow.getElementsByTagName('a')[0];
	console.log(buttonState.innerHTML);
	if(buttonState.innerHTML == 'Show More'){
		buttonState.innerHTML = 'Hide'
		buttonState.previousElementSibling.className+= ' active';
		
	}else{
		buttonState.innerHTML = 'Show More'
		buttonState.previousElementSibling.className = buttonState.previousElementSibling.className.replace(/( active)/g,"");

	}
}