const container = document.querySelector('.container');

const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', () => getUserInput());

function getUserInput() {
	event.preventDefault();
	const userInput = document.getElementById('locationSearchInput').value;

	if (userInput) {
		getWeatherData(userInput);
	} else {
		validLocationError();
	}
}

async function getWeatherData(location) {
	const apiKey = 'WHPCRHSJ4E8JK3YF8LRD3ETR9'
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		parseWeatherData(json);
		console.log(json);
	} catch (error) {
		console.error(error.message);
		validLocationError();
	}
}

function parseWeatherData(weatherData) {
	let weatherObject = {
		location: '',
		icon: '',
		currentTemp: '',
		feelsLike: '',
		humidity: '',
		wind: '',
	};

	weatherObject.location = weatherData.resolvedAddress.split(',')[0];
	weatherObject.icon = weatherData.currentConditions.icon;
	weatherObject.currentTemp = weatherData.currentConditions.temp;
	weatherObject.feelsLike = weatherData.currentConditions.feelslike;
	weatherObject.humidity = weatherData.currentConditions.humidity;
	weatherObject.wind = weatherData.currentConditions.windspeed;

	generateWeatherCard(weatherObject);
}

function generateWeatherCard(weatherObject) {
	const weatherCardContainer = document.querySelector('.weather-card-container');
	weatherCardContainer.innerHTML = '';
	const weatherCard = document.createElement('div');
	weatherCard.classList.add('weather-card');
	weatherCardContainer.appendChild(weatherCard);

	weatherCard.innerHTML = `
		<h3>${weatherObject.location}</h3>
		<div class='weather-icon'>
			<img id='weatherIcon' src="./weather-icons/${weatherObject.icon}.svg"/>
		</div>
		<div id='unitsContainer'>
			<p id='currentTemp'>${weatherObject.currentTemp}°C</p>
			<p>Feels like: ${weatherObject.feelsLike}°C</p>
			<p>Humidity: ${weatherObject.humidity} %</p>
			<p>Wind: ${weatherObject.wind} m/s</p>
		</div>
	`;
}

function validLocationError() {
	container.innerHTML += '<p>Enter a valid location!</p>';
}