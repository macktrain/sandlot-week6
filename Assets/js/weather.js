var apiKey = "5dfad075a28b4b329efff2efeff1f740";
var	searchText = document.getElementById("searchText");
const searchBtn = document.getElementById("searchBtn");
const todaysHeader = document.getElementById("todaysHeader");
const todaysWind = document.getElementById("todaysWind");
const todaysHumidity = document.getElementById("todaysHumidity");
const todaysUV = document.getElementById("todaysUV");
const history = document.getElementById("history");
var weatherImg = "";
var city = "Denver";
var state = "";
var numDays = 6;
var weatherData = new Object();
var listArr = new Array(5);
var todaysWeather = new Object();

//example  http://openweathermap.org/img/wn/10d@2x.png
var imgPath = " http://openweathermap.org/img/wn/";

todaysHeader.textContent = "Today's Accu-Weather";

var today = new Date();
var date = " (" + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + ")";
var time = today.getTime();

searchBtn.addEventListener("click", function() {getLatLon(searchText.value);}, false);

//getForecast(city);
//getCurrWeather(city);
//getLatLon();

function getLatLon(input)
{
	if (input.length === 0) 
	{
		alert("You must enter a valid city"); 
		return;
	}
	
	var dupCityNameArr = ["portland", "nashville", "springfield", "orange county", "kansas city", "long beach", "austin", "manhattan", "miami"];
	var dup = dupCityNameArr.includes(input.toLowerCase());
	
	if (dup)
	{
		alert (input + " is a city in more than 1 state.  Re-enter your request in the format 'city, state'.");
		return;
	}

	//Pulls current weather with current weather details
	fetch('https://api.openweathermap.org/geo/1.0/direct?q='+ input +',us&limit=1&appid='+ apiKey)
	// Return the API response as JSON
	.then(function (response) 
	{ 
		return response.json();
	})
	// Log the petData
	.then(function (data) 
	{
		console.log('Longitude & Latitude', data);
		//make these global
		var lat = data[0].lat;
		var lon = data[0].lon;
		
		getCurrWeather(lat, lon);
		add2History(input);
	})
	// Logs errors in console
	.catch(function (error) 
	{
		alert(input + ' is not valid. Please enter a valid city');
	});
	
}

function getCurrWeather(latitude, longitude)
{
	//Pulls current weather with current weather details
	fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&units=imperial&appid='+ apiKey)
	// Return the API response as JSON
	.then(function (response) 
	{ 
		return response.json();
	})
	// Log the petData
	.then(function (data) 
	{
		console.log('todays weather', data);
		//Set the data neede from dataset
		todaysWeather = data;
		showCurrentWeather (latitude, longitude);
	})
	// Logs errors in console
	.catch(function (error) 
	{
		console.log('Error todays weather:  ', error);
	});
	
}

function getForecast(citySearch)
{
	//Daily Forecast 16 Days but only pulling s days (parm ctn=x) to 
	//present the current day and the next (x-1) days
	fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q='+ citySearch +',us&units=imperial&cnt='+ numDays +'&appid='+ apiKey)
	// Return the API response as JSON
	.then(function (response) 
	{ 
		return response.json();
	})
	// Log the petData
	.then(function (data) 
	{
		console.log('weather', data);
		//Set the data neede from dataset
		weatherData = data.city;
		listArr = data.list;
		showForecast ();
	})
	// Logs errors in console
	.catch(function (error) 
	{
		console.log('Error weather forecast:  ', error);
	});
	
}

function showCurrentWeather(lat, lon)
{
	var clouds
	todaysHeader.textContent = todaysWeather.name +" "+ date;
	
	weatherImg = document.createElement('img');
	var icon = todaysWeather.weather[0].icon;
	weatherImg.setAttribute("src", imgPath + icon +"@2x.png");
	todaysHeader.appendChild(weatherImg);

	todaysTemp.textContent = "Temp: " + todaysWeather.main.temp + "°F";
	todaysWind.textContent = "Wind: " + todaysWeather.wind.speed + " MPH";
	todaysHumidity.textContent = "Humidity: " + todaysWeather.main.humidity + "%";

	weatherImg = document.createElement('span');
	weatherImg.setAttribute("src", imgPath + icon +"@2x.png");
	todaysHeader.appendChild(weatherImg);

	getUVI (lon,lat);
}

function add2History(name)
{
	var newBtn = document.createElement('button');
	newBtn.setAttribute("type", "button");
	newBtn.setAttribute("class", "historyBtn");
	newBtn.setAttribute("value", name);
	newBtn.innerHTML = name;
	history.appendChild(newBtn);
}


function getUVI(lon, lat)
{
	//GET UV index at Lat, Lon coords
	fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&exclude=hourly,daily&appid='+apiKey)
	// Return the API response as JSON
	.then(function (response) 
	{ 
		return response.json();
	})
	// Log the petData
	.then(function (uviData) 
	{
		console.log('UVI', uviData);
		var uvi = uviData.current.uvi + 0;
		var bgcolor = "";
		if (uvi < 3)   {bgcolor = "green"; } else
		if (uvi < 6)   {bgcolor = "#FBFE00";} else
		if (uvi < 8)   {bgcolor = "orange";} else
		if (uvi < 10)  {bgcolor = "red";   } else
		if (uvi >= 10) {bgcolor = "purple";}

		var uviEl = document.createElement('div');
		todaysUV.innerHTML = "UV Index: ";
		
		var uviEl = document.createElement('div');
		uviEl.setAttribute("id", "uvDivEl");
		uviEl.style.backgroundColor = bgcolor;
		uviEl.innerHTML = uviData.current.uvi;
		todaysUV.appendChild(uviEl);
	})
	// Logs errors in console
	.catch(function (error) 
	{
		console.log('Error weather forecast:  ', error);
	});
	
}
