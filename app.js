// const url =
// 	'https://newsapi.org/v2/top-headlines?' +
// 	'country=us&' +
// 	'apiKey=bd834e113bdd485691fa1c7d2f071f10';
const APID = '1a688c31-4379-4a7b-9854-e9d5284f7fa1';
const APIKEY = 'dVIq16EOvnYFmeR18WrLAt13MdtyILlT';



// const baseURL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=YOUR_API_KEY';
const baseURL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?';



const countrySelect = document.querySelector('#news-country');
const choicePanel = document.querySelector('.choice__panel');

const newsContainer = document.querySelector('.news__container');



document.addEventListener('DOMContentLoaded', fetchRandomNews);

function fetchRandomNews() {
	try {
		let req = new Request(
			`${baseURL}api-key=${APIKEY}`
		);
		fetch(req).then((response) => {
			response.json().then((data) => {
				console.log(data);
				const articles = data.results;
                console.log(articles)
				displayNews(articles);
			});
		});
	} catch (error) {
		
		console.error('Erorr fetching data', error);
		return [];
	}
}

function displayNews(articles) {
	newsContainer.innerHTML = '';
	articles.forEach((article) => {
		
			const newsCard = document.createElement('div');
			newsCard.classList.add('news__card');
			const newsImgDiv = document.createElement('div');
			newsImgDiv.classList.add('news__img');
			const img = document.createElement('img');
			img.classList.add('img');
			img.src = article['media'][0]['media-metadata'][1].url;

			img.alt = article['media'][0].caption;
			newsImgDiv.append(img);
			const newsContentBlock = document.createElement('div');
			newsContentBlock.classList.add('news__content-block');
			const newsTitle = document.createElement('h2');
			newsTitle.classList.add('news__title');
			newsTitle.innerHTML = article.title;
			const newsAuthor = document.createElement('h3');
			newsAuthor.classList.add('news__author');
			newsAuthor.innerHTML = article.updated;
			const newsArticle = document.createElement('p');
			newsArticle.classList.add('news__article');
			newsArticle.innerHTML = article.abstract;
			const link = document.createElement('a');
			link.classList.add('news__link');
			link.href = article.url;
			link.target = '_blank';
			link.innerHTML = 'Sourse';
			newsContentBlock.append(newsTitle);
			newsContentBlock.append(newsAuthor);
			newsContentBlock.append(newsArticle);
			newsContentBlock.append(link);
			newsCard.append(newsImgDiv);
			newsCard.append(newsContentBlock);

			newsContainer.append(newsCard);
		
	});
}

document.querySelector('.show-news').addEventListener('click', getNews);

function getNews() {
	try {
		// const country = document.querySelector('#news-country').value;
		const category = document.querySelector('#news-category').value;

		let req = new Request(
            // `${baseURL}country=${country}&category=${category}&apiKey=${APIKEY}`
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&api-key=${APIKEY}`
		);
		fetch(req).then((response) => {
			response.json().then((data) => {
				console.log(data);
				const articles = data.response.docs;
                console.log(articles.docs);
                
				// displayNews(articles);
			});
		});
	} catch (error) {
		console.error('Erorr fetching data', error);
		return [];
	}
}
