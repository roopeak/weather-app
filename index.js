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
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
	} catch (error) {
		console.error(error.message);
		validLocationError();
	}
}

function validLocationError() {
	container.innerHTML += '<p>Enter a valid location!</p>';
}

// getWeatherData();