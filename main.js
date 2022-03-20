
/* --------------- OpenWeather API START --------------- */

const api = {
	key: '13a9caa18eac28498b568a24e17056a3',
	url: 'https://api.openweathermap.org/data/2.5/weather'
}

/* --------------- OpenWeather API END --------------- */


/* --------------- GET PAGE ELEMENTS START --------------- */

const form = document.getElementById('searchform');
const searchbox = document.getElementById('searchbox');
const mainimg = document.getElementById('mainimg')
const cont = document.getElementById('cont')
const card = document.getElementById('card');
const date = document.getElementById('date');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

/* --------------- GET PAGE ELEMENTS END --------------- */


/* --------------- FUNCTIONS START --------------- */

function showCard() {
	cont.classList.replace('contenedor', 'contenedorenter');
	card.classList.remove('cardshowdisplay');
	setTimeout(function () {card.classList.replace('weather-card', 'cardshow');}, 100);
} /* --- Show Weather Card --- */

async function search(query) {
	try {
		const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`)
		const data = await response.json();
		showCard();
		console.log(data);
		city.innerHTML = `${data.name}, ${data.sys.country}`;
		date.innerHTML = (new Date()).toLocaleDateString();
		temperature.innerHTML = toCelsius(data.main.temp) + '°C';
		weather.innerHTML = data.weather[0].description;
		range.innerHTML = `${toCelsius(data.main.temp_min)}°C min / ${toCelsius(data.main.temp_max)}°C max`;
	} catch(err) {
		console.log(err);
		alert('ERROR de busqueda');
	}
} /* --- Get Weather Data and Replace --- */

function toCelsius(kelvin) {
	return Math.round(kelvin - 273.15);
} /* --- Converte Kelvin deg to Celsius --- */

function onSubmit(event) {
	event.preventDefault();
	search(searchbox.value);
} /* --- Run APP --- */

/* --------------- FUNCTIONS END --------------- */

form.addEventListener('submit', onSubmit, true); /* - Run APP - */
