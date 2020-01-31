// Open Weather API Key 23cfcf98d26d55db92e1f501489be10f
let APIkey = '23cfcf98d26d55db92e1f501489be10f'
let city = 'Orlando';
let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

$.ajax({
    url: queryURL,
    method: 'get'
}).then((res) => {
    console.log(res);
})