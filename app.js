// Open Weather API Key 23cfcf98d26d55db92e1f501489be10f
let APIkey = '23cfcf98d26d55db92e1f501489be10f'

$('.input-group-text').click(getCityWeather);

function getCityWeather() {
    let city = $('.input-search').val();
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;

    $.ajax({
        url: queryURL,
        method: 'get'
    }).then((res) => {
        console.log(res);
        $('.city-heading').text(`${res.name} - ${moment().format('ddd, MMMM DD YYYY')}`);
        $('.temp').text(`${res.main.temp} F`);
        $('.humidity').text(`${res.main.humidity}%`);
        $('.wind-speed').text(`${res.wind.speed} MPH`);
        //$('.uv-index').text(res.main.temp);
        $('.input-search').val('')
    })

    getForecast();
}

function getForecast() {
    $('.forecast-row').empty();
    let city = $('.input-search').val();
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=imperial&appid=${APIkey}`;

    console.log(city);

    $.ajax({
        url: queryURL,
        method: 'get'
    }).then((res) => {
        console.log(res);

        for (i = 0; i < res.list.length; i++) {
            let date = new Date(res.list[i].dt * 1000);
            console.log(date);
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let name = days[date.getDay()];

            // This condition makes sure to only get a day of the week that starts at '15:00:00' hours thus it gives you five days. 
            if (res.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                let forecastContainer = $(`<div class="col-lg-2 forecast-container mr-3">
                <h5 class="mt-5">${name}</h5>
                <i class="fas fa-cloud"></i>
                <ul class="temp-list">
                    <li>Temp: ${res.list[i].main.temp}</li>
                    <li>Humidity: ${res.list[i].main.humidity}</li>
                </ul>
                </div>`);
                $('.forecast-row').append(forecastContainer);
                console.log(res.list[i].dt_txt);
            }
        }
    })
}



