
    function attachEvents() {
		let btnLoad = document.getElementById("btnLoadTowns");
		let townsInput = document.getElementById("towns");
        btnLoad.addEventListener("click",()=>{
			$("#root").html('');
			let towns = townsInput.value.split(',')
			let source = document.getElementById("towns-template").innerHTML;
			let template = Handlebars.compile(source);
			let data = template({towns});
			$("#root").html(data);
		});
    }


