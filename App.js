import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
const axios = require('axios').default;

import HeaderComponent from './components/HeaderComponent';
import SearcherComponent from './components/SearcherComponent';
import MainComponent from './components/MainComponent';

export default class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            locationPermission: null,
            location: null,
            currentCity: 0
        };

        this.api = {
            url: 'http://api.openweathermap.org/data/2.5/',
            key: '8ea32bea1641e1d2a987988254d9d621'
        }

        this.changeModalVisibility = this.changeModalVisibility.bind(this);

        this.getCityByLocation = this.getCityByLocation.bind(this);
        this.getCitiesByLocation = this.getCitiesByLocation.bind(this);
        this.getCityByName = this.getCityByName.bind(this);
        this.getCityById = this.getCityById.bind(this);
        this.setCity = this.setCity.bind(this);
    }

    setCity(cityId) {
        this.setState(() => {
            return {
                currentCity: cityId
            };
        });
    }

    changeModalVisibility(val) {
        this.setState(() => {
            return {
                modalVisible: val,
            }
        });
    };

    getCityByLocation(lat, lon) {
        axios.get(this.api.url + 'weather', {
            params: {
                lat: lat,
                lon: lon,
                lang: 'pl',
                appid: this.api.key
            }
        })
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getCitiesByLocation(lat, lon) {
        return axios.get(`${this.api.url}find`, {
            params: {
                lat: lat,
                lon: lon,
                cnt: 10,
                lang: 'pl',
                appid: this.api.key
            }
        });
    }

    getCityByName(name) {
        axios.get(`${this.api.url}weather`, {
            params: {
                q: name,
                lang: 'pl',
                appid: this.api.key
            }
        })
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getCityById(id) {
        return axios.get(`${this.api.url}weather`, {
            params: {
                id: id,
                lang: 'pl',
                appid: this.api.key
            }
        });
    }

    componentDidMount() {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();

            this.setState(() => {
                return {
                    locationPermission: status
                }
            });

            if(status == 'granted') {
                let location = await Location.getCurrentPositionAsync({});

                this.setState(() => {
                    return {
                        location: location
                    }
                });
            }
        })();
    }

    render() {
        return (
            <View style={styles.main}>
                <SearcherComponent
                    changeModalVisibility={(val) => this.changeModalVisibility(val)}
                    modalVisible={this.state.modalVisible}
                    location={this.state.location}
                    getCitiesByLocation={(lat, lon) => this.getCitiesByLocation(lat,lon)}
                    setCity={(cityId) => this.setCity(cityId)}
                />
                <HeaderComponent
                    changeModalVisibility={(val) => this.changeModalVisibility(val)}
                />
                <MainComponent
                    getCityById={(id) => this.getCityById(id)}
                    currentCity={this.state.currentCity}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
