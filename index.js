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
		currentTemp: ''
	}

	weatherObject.location = weatherData.resolvedAddress.split(',')[0];
	weatherObject.currentTemp = weatherData.currentConditions.temp;

	generateWeatherCard(weatherObject);
	console.log(weatherObject);
}

function generateWeatherCard(weatherObject) {
	const weatherCard = document.createElement('div');
	container.appendChild(weatherCard);

	const locationHeader = document.createElement('h3');
	locationHeader.textContent = weatherObject.location;

	const currentTemperature = document.createElement('p');
	currentTemperature.textContent = weatherObject.currentTemp;

	weatherCard.append(locationHeader, currentTemperature);
}

function validLocationError() {
	container.innerHTML += '<p>Enter a valid location!</p>';
}
