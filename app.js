let APIkey = '23cfcf98d26d55db92e1f501489be10f'

let cities = ['orlando', 'new york', 'san francisco', 'miami', 'chicago'];

function renderCities() {
    $('.list-group').empty();
    let city;
    for (city of cities) {
        let listItem = $('<li>').addClass('list-group-item').attr('data-name', city).text(city);
        $('.list-group').append(listItem);
    }
}

function saveCities() {
    localStorage.setItem('cities', cities);
    renderCities();
}

getCities();

saveCities();

function getCities() {
    let result = localStorage.getItem('cities');
    if (result !== null) {
        cities = result.split(',');
        console.log(cities);
    }
}

let city;

$('.input-group-text').click(function () {
    city = $('.input-search').val()
    getCityWeather()
});

$(document).on('click', '.list-group-item', function () {
    city = $(this).attr('data-name');
    console.log(city);
    getCityWeather();
});

function getCityWeather() {

    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;

    if (!cities.includes(city)) {
        cities.unshift(city);
        cities.pop();
        renderCities();
        saveCities();
    }

    $.ajax({
        url: queryURL,
        method: 'get'
    }).then((res) => {
        $('#today').empty();
        let todaysContainer = $(`
            <h3 class="mt-5 city-heading">${res.name} -  ${moment().format('dddd MMM D YYYY')} </h3>
            <i class="today wi ${setWeatherIcon(res.weather[0].icon)}"></i>
            <ul class="temp-list">
                <li>Temperature: <span class="temp">${res.main.temp} F</span></li>
                <li>Humidity: <span class="humidity">${res.main.humidity}%</span></li>
                <li>Wind Speed: <span class="wind-speed">${res.wind.speed} MPH</span></li>
                <li>UV Index: <span class="uv-index"></span></li>
            </ul>
            `);
        $('.input-search').val('')
        $('#today').prepend(todaysContainer);
    })
    $('.forecast-row').empty();
    getForecast();
}

function getForecast() {
    $('.forecast-row').empty();
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=imperial&appid=${APIkey}`;

    $.ajax({
        url: queryURL,
        method: 'get'
    }).then((res) => {

        for (i = 0; i < res.list.length; i++) {
            let date = new Date(res.list[i].dt * 1000);
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let name = days[date.getDay()];

            // This condition makes sure to only get a day of the week that starts at '15:00:00' hours thus it gives you five days. 
            if (res.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                let forecastContainer = $(`<div class="col-lg-2 forecast-container mr-3">
                    <h5 class="mt-5">${name}</h5>
                    <i class="wi ${setWeatherIcon(res.list[i].weather[0].icon)}"></i>
                    <ul class="temp-list">
                        <li>Temp: ${res.list[i].main.temp}</li>
                        <li>Humidity: ${res.list[i].main.humidity}</li>
                    </ul>
                    </div>`);
                $('.forecast-row').append(forecastContainer);
            }
        }
    })
}

function setWeatherIcon(icon) {
    let weatherIcon;
    switch (icon) {
        case '01d':
            weatherIcon = "wi-day-sunny"
            break;
        case '01n':
            weatherIcon = "wi-night-clear"
            break;
        case '02d':
        case '02n':
            weatherIcon = "wi-cloudy"
            break;
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            weatherIcon = "wi-night-cloudy"
            break;
        case '09d':
        case '09n':
            weatherIcon = "wi-showers"
            break;
        case '10d':
        case '10n':
            weatherIcon = "wi-rain"
            break;
        case '11d':
        case '11n':
            weatherIcon = "wi-thunderstorm"
            break;
        case '13d':
        case '13n':
            weatherIcon = "wi-snow"
            break;
        case '50d':
        case '50n':
            weatherIcon = "wi-fog"
            break;
        default:
            weatherIcon = "wi-meteor"
    }
    return weatherIcon;
}