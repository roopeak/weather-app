async function getWeatherData() {
	const apiKey = 'WHPCRHSJ4E8JK3YF8LRD3ETR9'
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tampere?key=${apiKey}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
	} catch (error) {
		console.error(error.message);
	}
}

// getWeatherData();