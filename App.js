import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView} from 'react-native';

import HeaderComponent from './components/HeaderComponent';
import LocationComponent from './components/LocationComponent';
import SearcherComponent from './components/SearcherComponent';

export default class App extends Component
{
    constructor() {
        super();

        this.state = {
            modalVisible: false
        };

        this.changeModalVisibility = this.changeModalVisibility.bind(this);
    }

    changeModalVisibility(val) {
        this.setState(() => {
            return {
                modalVisible: val
            }
        })
    };

    render() {
        return (
            <View style={styles.main}>
                <SearcherComponent changeModalVisibility={(val) => this.changeModalVisibility(val)} modalVisible={this.state.modalVisible} />
                <HeaderComponent changeModalVisibility={(val) => this.changeModalVisibility(val)} />
    
                <ScrollView>
                    <Text>{Platform.OS}</Text>
                    <LocationComponent />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
