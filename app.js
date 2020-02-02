// Open Weather API Key 23cfcf98d26d55db92e1f501489be10f
let APIkey = '23cfcf98d26d55db92e1f501489be10f'



$('.input-group-text').click(getCityWeather);

function getCityWeather() {
    let city = $('.input-search').val();
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;

    console.log(city);

    $.ajax({
        url: queryURL,
        method: 'get'
    }).then((res) => {
        console.log(res);
        $('.city-heading').text(res.name);
        $('.temp').text(res.main.temp);
        $('.humidity').text(res.main.humidity);
        $('.wind-speed').text(res.wind.speed);
        //$('.uv-index').text(res.main.temp);
        $('.input-search').val('')
    })
}



