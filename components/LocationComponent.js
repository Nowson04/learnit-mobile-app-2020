import React from 'react';
import * as Location from 'expo-location';
import { View } from 'react-native';
const axios = require('axios').default;

export default class LocationComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.getCityByLocation = this.getCityByLocation.bind(this);
    }

    getCityByLocation(lat, lon) {
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

    componentDidMount() {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            this.props.changeLocationPermission(status);

            if(status == 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                this.props.changeLocation(location);
            }
        })();
    }

    render() {
        return (
            <View></View>
        )
    }
}