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
            location: null
        };

        this.changeModalVisibility = this.changeModalVisibility.bind(this);
    }

    changeModalVisibility(val) {
        this.setState(() => {
            return {
                modalVisible: val,
            }
        });
    };

    getCityByLocation(lat, lon) {
        axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: lat,
                lon: lon,
                appid: 'd16977e36c39af18ea3cde72eb7dd415'
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
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

                console.log(location);

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
                <SearcherComponent changeModalVisibility={(val) => this.changeModalVisibility(val)} modalVisible={this.state.modalVisible} />
                <HeaderComponent changeModalVisibility={(val) => this.changeModalVisibility(val)} />
                <MainComponent />
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
