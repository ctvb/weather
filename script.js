// // 
// var weather = localStorage.getItem ("Location").trim();
// clearTimeout.split(" ").join("20");

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={0ea49ec13420e68ee45ac131d00b02e9}

var currentDate = document.getElementById("currentDate");
var fiveDay = document.getElementById("forcastdate");

var cities = []
var sb = document.querySelector(".sb");
sb.addEventListener("click", function () {
	var city = document.querySelector(".city")
	console.log(city.value)
	var state = document.querySelector(".state")
	console.log(state.value)
	currentWeather(city.value, state.value)
	cities.push({city:city.value, state:state.value})
	localStorage.setItem("city", JSON.stringify(cities));
	buttons(city.value, state.value)
	// $(this).find("city.value", ".state").val(event);
})

function currentWeather(city, state) {
	var requesturl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=0ea49ec13420e68ee45ac131d00b02e9&units=imperial"
	fetch(requesturl)
		.then((response) => {
			console.log(response)
			return response.json()
		})
		.then((data) => {
			console.log(data)
			document.querySelector("#today").textContent = data.name + ", " + state.charAt(0).toUpperCase() + state.slice(1)
			document.querySelector(".img").src="https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
			document.querySelector(".temp").textContent = data.main.temp
			document.querySelector(".wind").textContent = data.wind.speed
			document.querySelector(".humidity").textContent = data.main.humidity
			document.querySelector(".conditions").textContent = data.weather[0].main
			forecast(data.coord.lat, data.coord.lon)
		});
}

function forecast(lat, lon) {
	var requesturl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=0ea49ec13420e68ee45ac131d00b02e9&units=imperial"
	fetch(requesturl)
		.then((response) => {
			console.log(response)
			return response.json()
		})
		.then((data) => {
			console.log(data)
			document.querySelector("#weatherCards").innerHTML = ``
			for (let i = 0; i < data.list.length; i++) {
				const element = data.list[i];
				if (element.dt_txt.includes("09:00:00")) {
					document.querySelector("#weatherCards").innerHTML += `<div class="column is-2">
				<div class="card has-background-danger-light">
					<div class="card-content">
						<div class="header-with-icon">
							<h2 class="title is-4">${element.dt_txt.split(" ")[0]}</h2>
							<span class="icon is-large has-text-warning">
								<img class="fas fa-sun img"src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
							</span>
						</div>
						<p class="content is-medium">Temp: ${element.main.temp}</p>
						<p class="content is-medium">Wind: ${element.wind.speed}</p>
						<p class="content is-medium">Humitidy: ${element.main.humidity}</p>
						<p class="content is-medium">Conditions: ${element.weather[0].main}</p>
					</div>
				</div>
			</div>`
				}
			}
		});
}


var buttoncontainer = document.getElementById("buttons-container")
function buttons(city, state) {
	var savedcities = JSON.parse(localStorage.getItem("city"))
	console.log(savedcities)
	cities = savedcities
	buttoncontainer.innerHTML = ""
	for (let index = 0; index < cities.length; index++) {
		const element = cities[index];
		console.log(element)
		var button = document.createElement("button")
		button.setAttribute("class", "button has-background-danger is-medium mb-2")
		button.innerHTML = element.city.charAt(0).toUpperCase() + city.slice(1)
		button.dataset.state=element.state
		button.addEventListener("click", function(event){
			let state = event.target.dataset.state
			currentWeather(event.target.innerText, state)
		})
		buttoncontainer.append(button)
		var savedCities = [];

		var difvar = JSON.parse(localStorage.getItem('city'));
		savedCities.push(...difvar)
		if (savedCities.length < 5) savedCities.unshift({city, state});
		else {
			savedCities.unshift({city, state});
			savedCities.pop();
		}
		console.log(savedCities)
		// JSON.stringify(localStorage.setItem('city', savedCities));
		localStorage.setItem("city", JSON.stringify(savedCities))
	}

}


