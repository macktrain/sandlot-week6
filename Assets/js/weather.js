var apiKey = "5dfad075a28b4b329efff2efeff1f740";
var	searchText = document.getElementById("searchText").value;
const searchBtn = document.getElementById("searchBtn");
const todaysHeader = document.getElementById("todaysHeader");
const todaysWind = document.getElementById("todaysWind");
const todaysHumidity = document.getElementById("todaysHumidity");
const todaysUV = document.getElementById("todaysUV");
var weatherImg = "";
searchBtn.addEventListener("click", function() {getForecast();}, false);
var city = "Denver";
var state = "";
var numDays = 6;
var weatherData = new Object();
var listArr = new Array(5);
var todaysWeather = new Object();
//example  http://openweathermap.org/img/wn/10d@2x.png
var imgPath = " http://openweathermap.org/img/wn/";

var today = new Date();
var date = " (" + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + ")";

getForecast(city);
getCurrWeather(city);

function getCurrWeather(citySearch)
{
	//Pulls current weather with current weather details
	fetch('https://api.openweathermap.org/data/2.5/weather?q='+ citySearch +',us&units=imperial&appid='+ apiKey)
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
}

function showForecast()
{


}

function add2History()
{
	//stuff
}
