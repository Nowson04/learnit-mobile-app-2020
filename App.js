import React from 'react';
import { StyleSheet, View } from 'react-native';

import HeaderComponent from './components/HeaderComponent';
import LocationComponent from './components/LocationComponent';
import SearcherComponent from './components/SearcherComponent';
import MainComponent from './components/MainComponent';

export default class App extends React.Component
{
    constructor() {
        super();

        this.state = {
            modalVisible: false,
            locationPermission: null,
            location: null
        };

        this.changeModalVisibility = this.changeModalVisibility.bind(this);
        this.changeLocationPermission = this.changeLocationPermission.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
    }

    changeModalVisibility(val) {
        this.setState(() => {
            return {
                modalVisible: val,
            }
        });
    };

    changeLocationPermission(val) {
        this.setState(() => {
            return {
                locationPermission: val
            }
        });
    }

    changeLocation(val) {
        console.log(val)
        this.setState(() => {
            return {
                location: val
            }
        });
    }

    render() {
        return (
            <View style={styles.main}>
                <SearcherComponent changeModalVisibility={(val) => this.changeModalVisibility(val)} modalVisible={this.state.modalVisible} />
                <HeaderComponent changeModalVisibility={(val) => this.changeModalVisibility(val)} />
                <MainComponent />

                <LocationComponent changeLocationPermission={(val) => this.changeLocationPermission(val)} locationPermission={this.state.locationPermission} changeLocation={(val) => this.changeLocation(val)} location={this.state.location} />
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
