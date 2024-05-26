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

function search(city) {
    try {
        let apiKey = '0ebc654fccbc00189d5408f3d6f15b08';
		let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

		let req = new Request(apiUrl);
		fetch(req).then((response) => {
			response.json().then((data) => {
                console.log(data);
                displayTemperature(data)
			});
		});
    } catch (error) {
        console.error('Erorr fetching data', error);
		return [];
    }
		
}

function displayTemperature(data) {
	let temperatureElement = document.querySelector(`#temperature`);
	let cityElement = document.querySelector(`#city`);
	let descriptionElement = document.querySelector(`#description`);
	let humidityElement = document.querySelector(`#humidity`);
	let windElement = document.querySelector(`#wind`);
	let dateElement = document.querySelector(`#date`);
	let iconElement = document.querySelector(`#icon`);

	celsiusTemperature = data.main.temp;

	temperatureElement.innerHTML = Math.round(celsiusTemperature) + ' °C';
	cityElement.innerHTML = data.name;
	descriptionElement.innerHTML = data.weather[0].description;
	humidityElement.innerHTML = data.main.humidity;
	windElement.innerHTML = Math.round(data.wind.speed);
	dateElement.innerHTML = formatDate(data.dt * 1000);
	iconElement.setAttribute(
		'src',
		`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute('alt', data.weather[0].description);

	// getForecast(response.data.coord);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector('#city-input');
	search(cityInputElement.value);
}

let formWeather = document.querySelector('#search-form');
formWeather.addEventListener('submit', handleSubmit);

search('Odesa');