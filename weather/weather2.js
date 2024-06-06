const weatherContainer = document.querySelector('.current-weather__container');

class GetWeatherData {
	constructor() {
		this.apiKey = '0ebc654fccbc00189d5408f3d6f15b08';
		this.apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
		this.forecastUrl = `https://api.openweathermap.org/data/2.5/forecast`;
	}

	fetchWeather(city) {
		const url = `${this.apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
		return fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error('City not found');
				}
				return response.json();
			})
			.catch((error) => {
				console.log('error fetching weather', error);
				return null;
			});
	}
}

class WeatherCard {
	constructor(
		// dt,
		description,
		temp,
		humidity,
		wind,
		weatherIconSrc,
		weatherIconAlt,
		parentSelector
	) {
		// this.dt = dt;
		this.description = description;
		this.temp = temp;
		this.humidity = humidity;
		this.wind = wind;
		this.weatherIconSrc = weatherIconSrc;
		this.weatherIconAlt = weatherIconAlt;
		this.parent = document.querySelector(parentSelector);
	}

	render(weatherData) {
		const element = document.createElement('div');
		element.add('weather__view');

		const overview = document.createElement('div');
		overview.classList.add('overview');

		const overviewList = document.createElement('ul');
		const liDate = document.createElement('li');
		liDate.classList.add('date');
		liDate.innerHTML = formatDate(this.dt * 1000);

		const liDescription = document.createElement('li');
		liDescription.classList.add('description');
		liDescription.innerHTML = this.weather[0].description;

		overviewList.append(liDate);
		overviewList.append(liDescription);

		overview.append(overviewList);
		weatherContainer.append(overview);

		// main weather data
		const weatherView = document.createElement('div');
		weatherView.classList.add('weather__view');

		const weatherIconDiv = document.createElement('div');
		weatherIconDiv.classList.add('weather-icon');
		const weatherIconImg = document.createElement('img');
		weatherIconImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
		weatherIconImg.alt = data.weather[0].description;
		weatherIconDiv.append(weatherIconImg);

		const weatherCurrent = document.createElement('ul');
		weatherCurrent.classList.add('weather__current');
		const temperatureLi = document.createElement('li');
		celsiusTemperature = this.temp;
		temperatureLi.innerHTML =
			'Temperature : ' + Math.round(celsiusTemperature) + ' °C';

		const humidity = document.createElement('li');
		humidity.innerHTML = ' Humidity: ' + this.humidity + '%';

		const wind = document.createElement('li');
		wind.innerHTML = 'Wind : ' + Math.round(this.wind.speed) + ' m/s';

		weatherCurrent.append(temperatureLi);
		weatherCurrent.append(humidity);
		weatherCurrent.append(wind);
		weatherView.append(weatherIconDiv);
		weatherView.append(weatherCurrent);

		viewContainer.append(weatherView);
		viewContainer.append(weatherCurrent);

		this.parent.append(element);
	}
}



// class WeatherCardView {

// }
