# 06 Server-Side APIs: Weather Dashboard

## Your Task

I created a weather dashboard using [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Leveraging the following API endpoints for the following purposes:

Given a city, derive latitude/longitude coords:  
https://api.openweathermap.org/geo/1.0/direct

Forecasted Weather (5 days):  
https://api.openweathermap.org/data/2.5/forecast

Current Weather:
https://api.openweathermap.org/data/2.5/weather

Gather UV Index data (original was deprecated so used this end point)
https://api.openweathermap.org/data/2.5/onecall


## PURPOSE
A traveler can easily track the current and forecasted weather for a rolling 10-day history.  The history is stored on localstorage.  Note that all weather icons used are native to the openweathermap API.

## HOW TO USE THE TOOL
Navigate to the url, https://macktrain.github.io/sandlot-week6/.  If it is your first time using the tool, it will only render the frame of the page with enough detail to ensure it is clear what to do. 
1.  Enter a city.  There is error checking to be sure the user does not enter blanks and ensures a valid city is entered.  In addition, there are about 9 city names that are used multiple times across multiple states.  These are caught and the user will be prompted to add a state as well.  This will iterate until a valid city or city/state combo are entered.
2.  The tool will then show the current days weather with UV index as well as forecast for the next 5 days.  In addition, a button for the current state will render in the history section.  A user can go back to the history and click these history buttons to recheck the weather and forecast for those cities viewed in the past.  To help maintain the integrity of the page and the usability, the history has been limited to a rolling 10 entries.
3.  Once a user closes and repoens, the history for the rolling 10 days will persist.

NOTE:  If a user starts a new session on a different workstation, their experience will start over from the beginning.

