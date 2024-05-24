// const url =
// 	'https://newsapi.org/v2/top-headlines?' +
// 	'country=us&' +
// 	'apiKey=bd834e113bdd485691fa1c7d2f071f10';
const APIKEY = 'bd834e113bdd485691fa1c7d2f071f10';


const baseURL = 'https://newsapi.org/v2/top-headlines?';



const countrySelect = document.querySelector('#news-country');
const choicePanel = document.querySelector('.choice__panel')

const newsContainer = document.querySelector('.news__container');



document.addEventListener('DOMContentLoaded', fetchRandomNews);

function fetchRandomNews() {
	try {
		let req = new Request(
			`${baseURL}country=us&pageSize=10&apiKey=${APIKEY}`
		);
		fetch(req).then((response) => {
			response.json().then((data) => {
				console.log(data);
				const articles = data.articles;
				displayNews(articles);
				
			});
		});
	}
	
	catch (error) {
		console.error('Erorr fetching data', error);
		return [];
	}
}

function displayNews(articles) {
	newsContainer.innerHTML = '';
	articles.forEach((article) => {
		if (article.title == '[Removed]') return;
		else { 
		
		const newsCard = document.createElement('div');
		newsCard.classList.add('news__card');
		const newsImgDiv = document.createElement('div');
		newsImgDiv.classList.add('news__img');
		const img = document.createElement('img');
		img.classList.add('img');
		img.src = article.urlToImage;
		img.alt = article.title;
		newsImgDiv.append(img);
		const newsContentBlock = document.createElement('div');
		newsContentBlock.classList.add('news__content-block');
		const newsTitle = document.createElement('h2');
		newsTitle.classList.add('news__title');
		newsTitle.innerHTML = article.title;
		const newsAuthor = document.createElement('h3');
		newsAuthor.classList.add('news__author');
		newsAuthor.innerHTML = article.author;
		const newsArticle = document.createElement('p');
		newsArticle.classList.add('news__article');
		newsArticle.innerHTML = article.description;
		const link = document.createElement('a');
		link.classList.add('news__link');
		link.href = article.url;
		link.target = '_blank'
		link.innerHTML = 'Sourse';
		newsContentBlock.append(newsTitle);
		newsContentBlock.append(newsAuthor);
		newsContentBlock.append(newsArticle);
		newsContentBlock.append(link)
		newsCard.append(newsImgDiv);
		newsCard.append(newsContentBlock);

		newsContainer.append(newsCard);
	}
	});
}





document.querySelector('.show-news').addEventListener('click', getNews)

function getNews() {
	
	try {
		const country = document.querySelector('#news-country').value;
		const category = document.querySelector('#news-category').value;

	let req = new Request(`${baseURL}country=${country}&category=${category}&apiKey=${APIKEY}`);
	fetch(req).then((response) => {
		response.json().then((data) => {
			console.log(data.articles);
			const articles = data.articles;
			console.log(articles)
			displayNews(articles)
		});
	});
	}
	catch(error) {
		console.error('Erorr fetching data', error);
		return [];
	}
    
}



