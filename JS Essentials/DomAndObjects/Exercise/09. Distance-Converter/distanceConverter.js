function attachEventsListeners() {
   let inputDistance = document.getElementById("inputDistance").value;
   let inputUnit = document.getElementById("inputUnits").value;
   let distanceInMetres;
   switch(inputDistance){
	   case "km":
		distanceInMetres = inputDistance*1000;
	   break;
	   case "m":
	   distanceInMetres = inputDistance;
	   break;
	   case "cm":
	   distanceInMetres = inputDistance*.01;
	   break;
	   case "mm":
	   distanceInMetres = inputDistance*.001;
	   break;
	   case "mi":
	   distanceInMetres = inputDistance* 1609.34;
	   break;
	   case "yrd":
	   distanceInMetres = inputDistance*.9144;
	   break;
	   case "ft":
	   distanceInMetres = inputDistance*.3048;
	   break;
	   case "in":
	   distanceInMetres = inputDistance*.0254;
	   break;
	   
   }
   console.log(distanceInMetres);
}