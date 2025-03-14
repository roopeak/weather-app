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
	container.appendChild(weatherCard);

	const locationHeader = document.createElement('h3');
	const currentTemperature = document.createElement('p');
	const feelsLikeTemp = document.createElement('p');
	const humidity = document.createElement('p');
	const wind = document.createElement('p');

	locationHeader.textContent = weatherObject.location;
	currentTemperature.textContent = weatherObject.currentTemp;
	feelsLikeTemp.textContent = weatherObject.feelsLike;
	humidity.textContent = weatherObject.humidity;
	wind.textContent = weatherObject.wind;

	weatherCard.append(
		locationHeader, 
		currentTemperature, 
		feelsLikeTemp, 
		humidity, 
		wind);
}

function validLocationError() {
	container.innerHTML += '<p>Enter a valid location!</p>';
}
