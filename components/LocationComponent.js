import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text } from 'react-native';
const axios = require('axios').default;

function getCityByLocation(lat, lon) {
    axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: lat,
            lon: lon,
            appid: 'd16977e36c39af18ea3cde72eb7dd415'
        }
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
}

export default function LocationComponent() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();

            console.log(status);
            if(status == 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                getCityByLocation(location.coords.latitude, location.coords.longitude);
            }
        })()
    }, []);

    let loc = JSON.stringify(location);

    return (
        <View>
            {/*<Text>{location.coords.latitude}</Text>
            <Text>{location.coords.longitude}</Text>*/}
        </View>
    );
}