// // 
// var weather = localStorage.getItem ("Location").trim();
// clearTimeout.split(" ").join("20");

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={0ea49ec13420e68ee45ac131d00b02e9}
var cities = []
var sb = document.querySelector(".sb");
sb.addEventListener("click", function () {
	var city = document.querySelector(".city")
	console.log(city.value)
	var state = document.querySelector(".state")
	console.log(state.value)
	currentWeather(city.value, state.value)
cities.push(city.value)
	localStorage.setItem("city", JSON.stringify(cities));
	buttons()
    // $(this).find("city.value", ".state").val(event);
})

function currentWeather(city, state) {
	var requesturl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=0ea49ec13420e68ee45ac131d00b02e9&units=imperial"
	fetch(requesturl)
		.then((response) => {
			console.log(response)
			return response.json()})
		.then((data) => {
			console.log(data)
		document.querySelector("#today").textContent = data.name + ", " + state
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
			return response.json()})
		.then((data) => {
			console.log(data)
			document.querySelector("#weatherCards").innerHTML = ``
		for (let i = 0; i < data.list.length; i++) {
			const element = data.list[i];
			if (element.dt_txt.includes("09:00:00")) {
				document.querySelector("#weatherCards").innerHTML+=`<div class="column is-2">
				<div class="card has-background-grey-light">
					<div class="card-content">
						<div class="header-with-icon">
							<h2 class="title is-4">${element.dt_txt.split(" ")[0]}</h2>
							<span class="icon is-large has-text-warning">
								<i class="fas fa-sun"></i>
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
function buttons() {
	var savedcities = JSON.parse(localStorage.getItem("city"))
	console.log(savedcities)
	cities = savedcities
	buttoncontainer.innerHTML = ""
	for (let index = 0; index < cities.length; index++) {
		const element = cities[index];
		console.log(element)
		var button = document.createElement("button")
		button.setAttribute("class", "button has-background-danger is-medium mb-2")
		button.innerHTML = element
		buttoncontainer.append(button)
	}
}
buttons()