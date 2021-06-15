import React from 'react';
import { View, ScrollView, Text, Platform, StyleSheet } from 'react-native';

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

    getWindDirection(value) {
        if(value >= 22.6 && value <= 67.5 ) {
            return "Północny Wschód";
        } else if(value >= 67.6 && value <= 112.5) {
            return "Wschód";
        } else if(value >= 112.6 && value <= 157.5) {
            return "Południowy Wschód";
        } else if(value >= 157.6 && value <= 202.5) {
            return "Południe"
        } else if(value >= 202.6 && value <= 247.5) {
            return "Południowy Zachód";
        } else if(value >= 247.6 && value <= 292.5) {
            return "Zachód";
        } else if(value >= 292.6 && value <= 337.5) {
            return "Północny Zachód";
        } else {
            return "Północ";
        }
    }

    componentDidUpdate() {
        if(this.props.currentCity != 0 && this.props.currentCity != this.state.currentCityId) {
            this.props.getCityById(this.props.currentCity)
            .then((res) => {
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
                            <Text style={styles.cityName}>
                                { this.state.weatherData.name }
                            </Text>

                            <Text style={styles.description}>
                                { this.state.weatherData.weather[0].description }
                            </Text>
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
                                    Widoczność: { this.state.weatherData.visibility / 100 }%
                                </Text>
                                <Text>
                                    Chmury: { this.state.weatherData.clouds.all }%
                                </Text>
                            </View>
                            
                            <View style={styles.weatherDataFlex}>
                                <Text>
                                    Wiatr: { this.state.weatherData.wind.speed }m/s
                                </Text>
                                <Text>
                                    Kierunek: { this.getWindDirection(this.state.weatherData.wind.deg) }
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    weather: {
    },
    weatherDataTop: {
        marginTop: "10%",
        flex: 1,
        alignItems: "center",
        height: "50%"
    },
    cityName: {
        fontSize: 30
    },
    description: {
        fontSize: 20
    },
    weatherDataBot: {
        //borderTopWidth: 1,
        //marginTop: "30%"
    },
    weatherDataFlex: {
        //flex: 1,
        //flexDirection: "row",
        //justifyContent: "space-between",
        borderTopWidth: 1,
    }
});