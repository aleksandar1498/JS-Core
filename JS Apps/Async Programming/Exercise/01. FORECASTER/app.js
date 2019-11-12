async function attachEvents() {
	const symbols = {
		"Sunny" : "&#x2600;",
		"Partly sunny" : "&#x26C5;",
		"Overcast" : "&#x2601;",
		"Rain" : "&#x2614;",
		"Degrees" : "&#176;",
	}
	let locationToSearch= document.getElementById("location");
	let submitBtn = document.getElementById("submit");
	let current = document.getElementById("current");
	let upcoming = document.getElementById("upcoming");
	
	let locations = await getLocations();
	
	
	
	submitBtn.addEventListener("click",async function(){
		let city = Object.values(locations).find(x => x.name == locationToSearch.value);
		current.innerHTML = '';
		upcoming.innerHTML = '';
			if (city === undefined) {
            const divForecast = document.createElement('div');
            divForecast.classList.add('forecasts');
            divForecast.textContent = 'Location does not exist in database. Try again.';
            current.appendChild(divForecast);
            return;
        
		}
		let [forecastForDay,forecastNextDays] =await Promise.all([forecastForCurrentDay(city.code),forecastForNextThreeDays(city.code)]);
		createForecast(forecastForDay);
		createUpcoming(forecastNextDays);
	});
	function createForecast(data){
		
		const divLabel = document.createElement('div');
        divLabel.classList.add('label');
        divLabel.textContent = 'Current conditions';
        current.appendChild(divLabel);
		
		let forecasts = document.createElement("div");
		forecasts.className = "forecasts";
		console.log(data);
		
		
		let condition = generateCondition();
		
		condition.appendChild(generateForecastData(data.name));
		condition.appendChild(generateForecastData(`${data.forecast.low}&#176;/${data.forecast.high}&#176;`));
		condition.appendChild(generateForecastData(data.forecast.condition));
		
		
		forecasts.appendChild(generateSymbolCondition(data.forecast.condition));
		forecasts.appendChild(condition);
		
		current.appendChild(forecasts);
		
	}
	function createUpcoming(data){
		
		
        const divLabel = document.createElement('div');
        divLabel.classList.add('label');
        divLabel.textContent = 'Three-day forecast';
        upcoming.appendChild(divLabel);
		
		let forecast_info = document.createElement("div");
		forecast_info.className = "forecast-info";
	
		Object.values(data.forecast).forEach(x => {
			forecast_info.appendChild(createForecastInfo(x.condition,x.low,x.high));
		});
		upcoming.appendChild(forecast_info);
	}
	function createForecastInfo(condition,low,high){
		let upcoming = document.createElement("div");
		upcoming.className = 'upcoming';
		
		let symbol = document.createElement("span");
		symbol.classList.add("symbol");
		symbol.innerHTML = symbols[condition];
		upcoming.appendChild(symbol);
		upcoming.appendChild(generateForecastData(`${low}&#176;/${high}&#176;`));
		upcoming.appendChild(generateForecastData(`condition`));
		return upcoming;
	}
	function generateSymbolCondition(con){
		let condition =  generateCondition();
		condition.classList.add("symbol");
		condition.innerHTML = symbols[con];
		return condition;
	}
	function generateCondition(){
		let condition =  document.createElement("span");
		condition.classList.add("condition");
		return condition;
	}
	function generateForecastData(content){
		let data =  document.createElement("span");
		data.classList.add("forecast-data");
		data.innerHTML = content;
		return data;
	}
	
	function getLocations(){
		return fetch('https://judgetests.firebaseio.com/locations.json').then(res => res.json());
	}
	function forecastForCurrentDay(code){
		return fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`).then(res => res.json());
	}
	function forecastForNextThreeDays(code){
		return fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`).then(res => res.json());
	}

	
}

attachEvents();