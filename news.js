const url =
	'https://newsapi.org/v2/top-headlines?' +
	'country=us&' +
	'apiKey=bd834e113bdd485691fa1c7d2f071f10';

const baseURL = 'https://newsapi.org/v2/top-headlines?';
const countrySelect = document.querySelector('#country-news')


let req = new Request(url);
fetch(req).then((response) => {
	response.json().then((data) => {
		console.log(data);
	});
});

countrySelect.addEventListener('change', getNews)

function getNews() {
    const country = document.querySelector('#country-news').value;
	let req2 = new Request(`${baseURL}country=${country}&apiKey=${APIKEY}`);
	fetch(req2).then((response) => {
		response.json().then((data) => {
			console.log(data);
		});
	});
}
