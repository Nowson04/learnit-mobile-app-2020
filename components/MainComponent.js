import React from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';

export default class MainComponent extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Text>{Platform.OS}</Text>
                </ScrollView>
            </View>
        )
    }
}