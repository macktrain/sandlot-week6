var apiKey = "5dfad075a28b4b329efff2efeff1f740";
var	searchText = document.getElementById("searchText");
const searchBtn = document.getElementById("searchBtn");
const todaysHeader = document.getElementById("todaysHeader");
const todaysWind = document.getElementById("todaysWind");
const todaysHumidity = document.getElementById("todaysHumidity");
const todaysUV = document.getElementById("todaysUV");
const history = document.getElementById("history");
const multiDay = document.getElementById("multiDay");
var weatherImg = "";
var state = "";
var numDays = 6;
var weatherData = new Object();
var listArr = new Array(5);
var todaysWeather = new Object();

var imgPath = " http://openweathermap.org/img/wn/";

todaysHeader.textContent = "Today's Accu-Weather";

var today = new Date();
var date = " (" + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + ")";
var time = today.getTime();

searchBtn.addEventListener("click", function() {getLatLon(searchText.value);}, false);

prePopulate ();

function getLatLon(input,history)
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
	.then(function (data) 
	{
		console.log('Longitude & Latitude', data);
		//make these global
		var lat = data[0].lat;
		var lon = data[0].lon;
		
		getCurrWeather(lat, lon);
		getForecast(input);
		if (!history) add2History(input);
		
	})
	// Logs errors in console
	.catch(function (error) 
	{
		alert(input + ' is not valid. Please enter a valid city');
	});
	
}

function getForecast(citySearch)
{
	//Daily Forecast 16 Days but only pulling s days (parm ctn=x) to 
	//present the current day and the next (x-1) days
	fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q='+ citySearch +',us&cnt='+ numDays +'&units=imperial&appid='+ apiKey)
	// Return the API response as JSON
	.then(function (response) 
	{ 
		return response.json();
	})	
	.then(function (data) 
	{
		console.log('5-Day Forecast', data);
		multiDay.innerHTML = "";
		//Set the data neede from dataset
		for (var i=1; i< data.cnt; i++)
		{
			//Parent Div
			var nextDay = document.createElement('div');
			nextDay.setAttribute("id", "nextDay"+i);
			nextDay.setAttribute("class", "nextDay");
			nextDay.style.backgroundColor = "#33475A";

			//Child Div with date
			var timestamp = data.list[i].dt;
			var date = new Date(timestamp*1000);
			var nextDayDate = document.createElement('div');
			nextDayDate.setAttribute("class", "needsBold");
			nextDay.appendChild(nextDayDate);
			nextDayDate.textContent = date.getMonth()+"/"+(date.getDate()+1)+"/"+date.getFullYear();
	
			//Child Div to add forecasted weather icon
			var forecastWeatherImg = document.createElement('img');
			var icon = data.list[i].weather[0].icon;
			forecastWeatherImg.setAttribute("src", imgPath + icon +"@2x.png");
			forecastWeatherImg.setAttribute("width", "50px");
			forecastWeatherImg.setAttribute("height", "50px");
			nextDay.appendChild(forecastWeatherImg);
		
			//Child Div for Temp
			var nextDayTemp = document.createElement('div');
			nextDayTemp.setAttribute("class", "forecastData");
			nextDay.appendChild(nextDayTemp);
			nextDay.style.padding = "7px";
			//chose feel_like because there is a data error on the side of openWeather
			nextDayTemp.textContent = "Temp: " + data.list[i].feels_like.day + "°F";

			//Child Div for Wind
			var nextDayWind = document.createElement('div');
			nextDayWind.setAttribute("class", "forecastData");
			nextDay.appendChild(nextDayWind);
			nextDayWind.textContent = "Wind: " + data.list[i].speed + " MPH";

			//Child Div for Humidity
			var nextDayHumidity = document.createElement('div');
			nextDayHumidity.setAttribute("class", "forecastData");
			nextDay.appendChild(nextDayHumidity);
			nextDayHumidity.textContent = "Humidity: " + data.list[i].humidity + "%";

			multiDay.appendChild(nextDay);
		} 
	})
	// Logs errors in console
	.catch(function (error) 
	{
		console.log('Error weather forecast:  ', error);
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

function showCurrentWeather(lat, lon)
{
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
	newBtn.setAttribute("onClick", "getLatLon('"+ name +"','0')");
	newBtn.setAttribute("value", name);
	newBtn.innerHTML = name;
	//makes the last search first/most recent
	history.insertBefore(newBtn, history.childNodes[0]);

	//Initialize local storage for future use
	if ("weatherAppInit" in localStorage)
	{
		var savedCities = JSON.parse(localStorage.getItem("weatherApp"));
	}
	else
	{
		//This is done to let the app know if the array of previous selections was made or not
		localStorage.setItem('weatherAppInit', 'weatherAppInit');
		//Initialize the localstorage array
		var savedCities = [];
		localStorage.setItem('weatherApp', JSON.stringify(savedCities));
	}
		//We are managing a rolling list of 10 cities 
	if (savedCities.length < 3)
	{
		savedCities.splice(0, 0, name);
	}
	else
	{
		//Add the newest to the beginning
		savedCities.splice(0, 0, name);
		//Remove the 11th element
		savedCities.pop();
	}
	
	localStorage.setItem("weatherApp", JSON.stringify(savedCities));
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

function prePopulate()
{
	if ("weatherAppInit" in localStorage)
	{
		var savedCities = JSON.parse(localStorage.getItem("weatherApp"));

		for (var i = 0; i < savedCities.length; i++)
		{
			var newBtn = document.createElement('button');
			newBtn.setAttribute("type", "button");
			newBtn.setAttribute("class", "historyBtn");
			newBtn.setAttribute("onClick", "getLatLon('"+ savedCities[i] +"','1')");
			newBtn.setAttribute("value", savedCities[i]);
			newBtn.innerHTML = savedCities[i];
			history.appendChild(newBtn);
		}
	}
}