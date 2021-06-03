import React from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';

export default class MainComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            weatherData: null,
            currentCityId: 0
        };

        this.kelvinCelsiusValue = 273.15;
    }

    kelvinToCelsius(kelvinValue) {
        return parseInt(kelvinValue - this.kelvinCelsiusValue) + "°C";
    }

    componentDidUpdate() {
        if(this.props.currentCity != 0 && this.props.currentCity != this.state.currentCityId) {
            this.props.getCityById(this.props.currentCity)
            .then((res) => {
                console.log(res.data);
                this.setState(() => {
                    return {
                        weatherData: res.data,
                        currentCityId: this.props.currentCity
                    };
                });
            });
        }
    }

    render() {
        if (this.state.weatherData == null) {
            return (
                <View>
                    <Text>Wybierz miejscowość</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.weather}>
                        <View style={styles.weatherDataTop}>
                            <View style={styles.cityName}>
                                <Text>
                                    { this.state.weatherData.name }
                                </Text>
                            </View>

                            <View style={styles.description}>
                                <Text>
                                    { this.state.weatherData.weather[0].description }
                                </Text>
                            </View>
                        </View>
                        
                        <View style={styles.weatherDataBot}>
                            <View style={styles.weatherDataFlex}>
                                <Text>
                                    Temp: { this.kelvinToCelsius(this.state.weatherData.main.temp) }
                                </Text>
                                <Text>
                                    Odczuwalna: { this.kelvinToCelsius(this.state.weatherData.main.feels_like) }
                                </Text>
                            </View>
                            
                            <View style={styles.weatherDataFlex}>
                                <Text>
                                    Ciśnienie: { this.state.weatherData.main.pressure }hPa
                                </Text>
                                <Text>
                                    Wilgotność: { this.state.weatherData.main.humidity }%
                                </Text>
                            </View>

                            <View style={styles.weatherDataFlex}>
                                <Text>
                                    Widoczność{ this.state.weatherData.visibility / 100 }%
                                </Text>
                                <Text>
                                    Chmury: { this.state.weatherData.clouds.all }%
                                </Text>
                            </View>
                            
                            <View style={styles.weatherDataWindFlex}>
                                <Text>
                                    Wiatr: { this.state.weatherData.wind.speed }m/s
                                </Text>
                                <Text>
                                    Kierunek: { this.state.weatherData.wind.deg }
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}