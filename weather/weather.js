const weatherContainer = document.querySelector('.current-weather__container');

let cityInputElement = document.querySelector('#city-input');
const forecastContainer = document.querySelector('.forecast__window');

const forecastArray = document.querySelectorAll('.forecast__list');
console.log(forecastArray);


function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return days[day];
}

//! display todays weather on search

function search(city) {
	weatherContainer.innerHTML = '';
	try {
		let apiKey = '0ebc654fccbc00189d5408f3d6f15b08';
		let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

		fetch(apiUrl).then((response) => {
			response.json().then((data) => {
				// console.log(data);
				
				displayCity(data);
				displayWeatherView(data);
				
				console.log(data.coord);				
			});
		});
	} catch (error) {
		console.error('Erorr fetching data', error);
	}

}



function handleSubmit(event) {
	event.preventDefault();
	// let cityInputElement = document.querySelector('#city-input');
	search(cityInputElement.value);	
}

let formWeather = document.querySelector('#search-form');
formWeather.addEventListener('submit', handleSubmit);

search('Odesa');



// weather view

function displayCity(data) {
	const city = document.createElement('h1');
	weatherContainer.append(city);
	city.innerHTML = data.name;
}

function displayWeatherView(data) {
	const viewContainer = document.createElement('div');
	viewContainer.classList.add('view__container');

	const overview = document.createElement('div');
	overview.classList.add('overview');

	const overviewList = document.createElement('ul');
	const liDate = document.createElement('li');
	liDate.classList.add('date');
	liDate.innerHTML = formatDate(data.dt * 1000);

	const liDescription = document.createElement('li');
	liDescription.classList.add('description');
	liDescription.innerHTML = data.weather[0].description;

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
	celsiusTemperature = data.main.temp;
	temperatureLi.innerHTML =
		'Temperature : ' + Math.round(celsiusTemperature) + ' °C';

	const humidity = document.createElement('li');
	humidity.innerHTML = ' Humidity: ' + data.main.humidity + '%';

	const wind = document.createElement('li');
	wind.innerHTML = 'Wind : ' + Math.round(data.wind.speed) + ' m/s';

	weatherCurrent.append(temperatureLi);
	weatherCurrent.append(humidity);
	weatherCurrent.append(wind);
	weatherView.append(weatherIconDiv);
	weatherView.append(weatherCurrent);

	viewContainer.append(weatherView);
	viewContainer.append(weatherCurrent);

	
	weatherContainer.append(viewContainer);
}



// ! forecast for some days



// currentLocation()

function getWeatherDetails(name, lat, lon, country) {
	let apiKey = '0ebc654fccbc00189d5408f3d6f15b08';
	let forecastAPIURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	let WeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	fetch(WeatherApiUrl)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});

	fetch(forecastAPIURL)
		.then((res) => res.json())
		.then((data) => {
			const forecastList = data.daily;
			console.log(forecastList);

			forecastContainer.innerHTML = '';
			for (let i = 1; i < forecastList.length; i++) {
				let date = new Date(forecastList[i].dt);
				forecastContainer.innerHTML += `
			<ul class="forecast__list">
			<li> date ${date.getDate()}</li>
			<li>${days[date.getDay()]}</li>
			<li class='weather-icon'>
			<img class="icon-small" src="https://openweathermap.org/img/wn/${
				forecastList[i].weather[0].icon
			}@2x.png">
			</li>
			<li> ${forecastList[i].weather[0].description}</li>
			<li> temperature ${forecastList[i].temp.day.toFixed(0)}&deg;C</li>
			<li> Humidity ${forecastList[i].humidity}%</li>
			<li>Wind: ${forecastList[i]['wind_speed']} m/s</li>
			</ul>
			`;
			}
		})
		.catch(() => {
			console.log('error forecast');
		});
}


function getCityCoordinates() {
	let city = document.querySelector('#city-input').value;
	let apiKey = '0ebc654fccbc00189d5408f3d6f15b08';

	if (!city) return;
	let GeoAPIURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
	fetch(GeoAPIURL).then(res => res.json()).then(data => {
		let { name, lat, lon, country } = data[0];
		getWeatherDetails(name, lat, lon, country);
		// console.log(data)
	}).catch(() => {
		console.log('error')
	})	
}

getWeatherDetails(46.48, 30.73);

// console.log(getCityCoordinates(cityInputElement.value))
formWeather.addEventListener('submit', getCityCoordinates);

















