var apiKey = "5dfad075a28b4b329efff2efeff1f740";
var	searchText = document.getElementById("searchText").value;
const searchBtn = document.getElementById("searchBtn");
const todaysHeader = document.getElementById("todaysHeader");
const todaysWind = document.getElementById("todaysWind");
const todaysHumidity = document.getElementById("todaysHumidity");
const todaysUV = document.getElementById("todaysUV");
var weatherImg = "";
var city = "Denver";
var state = "";
var numDays = 6;
var weatherData = new Object();
var listArr = new Array(5);
var todaysWeather = new Object();
var lat = "";
var lon = "";
//example  http://openweathermap.org/img/wn/10d@2x.png
var imgPath = " http://openweathermap.org/img/wn/";

todaysHeader.textContent = "Today's Accu-Weather";

var today = new Date();
var date = " (" + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + ")";
var time = today.getTime();

searchBtn.addEventListener("click", function() {getLatLon(searchText);}, false);

//getForecast(city);
//getCurrWeather(city);
//getLatLon();

function getLatLon(input)
{
	var qStr = "";
	if (input.length === 0) 
	{
		alert("You must enter a valid city"); 
		return;
	}
	//Pulls current weather with current weather details
	fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ qStr +'us&limit=1&appid='+ apiKey)
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
		lat = data[0].lat;
		lon = data[0].lon;

	})
	// Logs errors in console
	.catch(function (error) 
	{
		alert(input + ' is not valid. Please enter a valid city');
	});
	
}

function getCurrWeather(citySearch)
{
	//Pulls current weather with current weather details
	fetch('api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&units=imperial&appid='+ apiKey)
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
		showCurrentWeather ();
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

function showCurrentWeather()
{
	var uvColorIndex = ['green','green','yellow','yellow','yellow','orange','orange','red','red','purple'];
	var clouds
	todaysHeader.textContent = todaysWeather.name +" "+ date;
	
	weatherImg = document.createElement('img');
	var icon = todaysWeather.weather[0].icon;
	weatherImg.setAttribute("src", imgPath + icon +"@2x.png");
	todaysHeader.appendChild(weatherImg);

	todaysTemp.textContent = "Temp: " + todaysWeather.main.temp + "°F";
	todaysWind.textContent = "Wind: " + todaysWeather.wind.speed + " MPH";
	todaysHumidity.textContent = "Humidity: " + todaysWeather.main.humidity + "%";
	todaysUV.textContent = "UV Index: ";

	weatherImg = document.createElement('span');
	switch(expression) {
		case x:
		  // code block
		  break;
		case y:
		  // code block
		  break;
		default:
		  // code block
	  }
	weatherImg.setAttribute("src", imgPath + icon +"@2x.png");
	todaysHeader.appendChild(weatherImg);
}

function showForecast()
{


}

function add2History()
{
	//stuff
}


function getUVI(citySearch)
{
	//Daily Forecast 16 Days but only pulling s days (parm ctn=x) to 
	//present the current day and the next (x-1) days
	fetch('http://api.openweathermap.org/v3/uvi/'+ citySearch +'/'+ time +'&appid='+ apiKey)
	// Return the API response as JSON
	.then(function (response) 
	{ 
		return response.json();
	})
	// Log the petData
	.then(function (data) 
	{
		console.log('weather', data);
		//Send the UV Index back
		return(a);
	})
	// Logs errors in console
	.catch(function (error) 
	{
		console.log('Error weather forecast:  ', error);
	});
	
}
