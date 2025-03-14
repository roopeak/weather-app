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
		console.log(json);
		parseWeatherData(json);
	} catch (error) {
		console.error(error.message);
		validLocationError();
	}
}

function parseWeatherData(weatherData) {
	let weatherObject = {
		location: '',
		currentTemp: '',
		feelsLike: '',
		humidity: '',
		wind: '',
	};

	weatherObject.location = weatherData.resolvedAddress.split(',')[0];
	weatherObject.currentTemp = weatherData.currentConditions.temp;
	weatherObject.feelsLike = weatherData.currentConditions.feelslike;
	weatherObject.humidity = weatherData.currentConditions.humidity;
	weatherObject.wind = weatherData.currentConditions.windspeed;

	generateWeatherCard(weatherObject);
	console.log(weatherObject);
}

function generateWeatherCard(weatherObject) {
	const weatherCard = document.createElement('div');
	weatherCard.classList.add('weather-card');
	container.appendChild(weatherCard);

	weatherCard.innerHTML = `
		<h3>${weatherObject.location}</h3>
		<p id='currentTemp'>${weatherObject.currentTemp} °C</p>
		<p>Feels like: ${weatherObject.feelsLike} °C</p>
		<p>Humidity: ${weatherObject.humidity} %</p>
		<p>Wind: ${weatherObject.wind} m/s</p>
	`;
}

function validLocationError() {
	container.innerHTML += '<p>Enter a valid location!</p>';
}

let weatherObject = {
	location: 'Tampere',
	currentTemp: '23',
	feelsLike: '25',
	humidity: '80',
	wind: '2.3',
};

generateWeatherCard(weatherObject);