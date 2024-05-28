const weatherContainer = document.querySelector('.current-weather__container');

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
				console.log(data);
				
				displayCity(data);
				displayWeatherView(data);
				
				console.log(data.coord);
				return data.coord;
			});
		});
	} catch (error) {
		console.error('Erorr fetching data', error);
	}
}


function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector('#city-input');
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

// function displayCurrentWeather() {
// 	const viewContainer = document.querySelector('.view__container');
// 	// displayWeatherView(data);
// 	weatherContainer.append(viewContainer);
// }

// ! forecast for some days

function getCoords(data) {

}

function getForecast(coordinates) {
	console.log(coordinates);
	// let apiKey = '0ebc654fccbc00189d5408f3d6f15b08';
	// let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	// console.log(apiUrl);
	// fetch(apiUrl).then((response) => {
	// 	response.json().then((data) => {
	// 		console.log(data);
			
	// 	});
	// });	
}

getForecast()
