const axios = require('axios').default;

function get(lat, lon) {
    axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: lat,
            lon: lon,
            appid: 'd16977e36c39af18ea3cde72eb7dd415'
        }
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
}

get(52.31593235907417, 16.128442456060128);