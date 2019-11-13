$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
       let source = document.getElementById("cat-template").innerHTML;
	   let template = Handlebars.compile(source);
	   let data = {cats: window.cats};
	   document.getElementById("allCats").innerHTML = template(data);
	   $(".card-block button").on('click',function(evt){
		   let current = evt.target;
		   toggleVisibility(current);
		   
	   });
    }
	function toggleVisibility(btn){
		if(btn.innerHTML == "Show status code"){
			btn.innerHTML = "Hide status code";
			console.log(btn.nextElementSibling);
			btn.nextElementSibling.style.display = "block";
		}else{
			btn.innerHTML = "Show status code";
			btn.nextElementSibling.style.display = "none";
		}
	}

})
