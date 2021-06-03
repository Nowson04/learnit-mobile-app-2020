import React from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';

export default class MainComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.data = {};
    }

    componentDidUpdate() {
        if(this.props.currentCity != 0) {
            this.props.getCityById(this.props.currentCity)
            .then((res) => {
                this.data = res.data;
            });
        }
    }

    render() {
        if (this.data.lenght == 0) {
            return (
                <View>
                    <Text>Wybierz miejscowość</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>{ this.data.name }</Text>
                    <Text>{ this.weather }</Text>
                    <Text>{ this.temp }</Text>
                    <Text>{ this.tempFeels }</Text>
                    <Text>{ this.pressure }</Text>
                    <Text>{ this.humidity }</Text>
                    <Text>{ this.visibility }</Text>
                    <Text>{ this.wind }</Text>
                    <Text>{ this.clouds }</Text>                
                </View>
            )
        }
    }
}