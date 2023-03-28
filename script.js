const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D?lang=en&units=auto",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "c2360459b1msh4b28052fa0200ebp137232jsnd765fb5d7108",
		"X-RapidAPI-Host": "dark-sky.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});