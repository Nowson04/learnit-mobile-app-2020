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
                <View style={styles.selectCityBox}>
                    <Text style={styles.selectCityText}>Wybierz miejscowość</Text>
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
                                <Text style={styles.weatherDataFlexText}>
                                    { this.kelvinToCelsius(this.state.weatherData.main.temp) }{"\n\n"}
                                    Temperatura
                                </Text>
                                <Text style={styles.weatherDataFlexText}>
                                    { this.kelvinToCelsius(this.state.weatherData.main.feels_like) }{"\n\n"}
                                    Temperatura Odczuwalna
                                </Text>
                            </View>
                            
                            <View style={styles.weatherDataFlex}>
                                <Text style={styles.weatherDataFlexText}>
                                    { this.state.weatherData.main.pressure }hPa{"\n\n"}
                                    Ciśnienie
                                </Text>
                                <Text style={styles.weatherDataFlexText}>
                                    { this.state.weatherData.main.humidity }%{"\n\n"}
                                    Wilgotność
                                </Text>
                            </View>

                            <View style={styles.weatherDataFlex}>
                                <Text style={styles.weatherDataFlexText}>
                                    { this.state.weatherData.visibility / 100 }%{"\n\n"}
                                    Widoczność
                                </Text>
                                <Text style={styles.weatherDataFlexText}>
                                    { this.state.weatherData.clouds.all }%{"\n\n"}
                                    Zachmurzenie
                                </Text>
                            </View>
                            
                            <View style={styles.weatherDataFlex}>
                                <Text style={styles.weatherDataFlexText}>
                                    { this.state.weatherData.wind.speed }m/s{"\n\n"}
                                    Prędkość wiatru
                                </Text>
                                <Text style={styles.weatherDataFlexText}>
                                    { this.getWindDirection(this.state.weatherData.wind.deg) }{"\n\n"}
                                    Kierunek Wiatru
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
    selectCityBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    selectCityText: {
        fontSize: 45,
    },
    weather: {
    },
    weatherDataTop:  {
        marginTop: "30%",
    },
    cityName: {
        fontSize: 40,
        textAlign: "center"
    },
    description: {
        fontSize: 30,
        textAlign: "center"
    },
    weatherDataBot: {
        marginTop: "30%",
        backgroundColor: "#2f2f2f"
    },
    weatherDataFlex: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        borderTopWidth: 2,
    },
    weatherDataFlexText: {
        fontSize: 20,
        width: "50%",
        textAlign: "center",
    }
});