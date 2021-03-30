import React from 'react';
import { TextInput } from 'react-native';
import { View, Modal, Text, Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default class SearcherComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.currentCity = NaN;
        this.onChange = this.onChange.bind(this);
    }

    onChange(val) {
        this.currentCity = val;
        console.log(val);
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.changeModalVisibility(false);
                    }}
                >
                    <View style={styles.modalBoxContainer}>
                        <View style={styles.modalBoxHeader}>
                            <View style={styles.modalFlexContainer}>
                                <View style={styles.modalBoxLocation}>
                                    <Pressable onPress={() => this.props.getByCurrentLocation()}>
                                        <Icon name='map' color="#fff"></Icon>
                                    </Pressable>
                                </View>

                                <View style={styles.modalBoxInput}>
                                    <TextInput
                                        onChangeText={this.currentCity}
                                        placeholder="Wpisz miejścowość"
                                    ></TextInput>
                                </View>

                                <View style={styles.modalBoxClose}>
                                    <Pressable onPress={() => this.props.changeModalVisibility(false)}>
                                        <Icon name='close' color="#fff"></Icon>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        <View style={styles.modalBoxContent}>

                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalBoxContainer: {
        backgroundColor: "#0099ff",
        height: "90%",
        margin: "10%",
        borderRadius: 5
    },
    modalBoxHeader: {
        height: "5%"
    },
    modalFlexContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    modalBoxLocation: {
        width: "13%"
    },
    modalBoxInput: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: "#c2c2c2",
        width: "74%"
    },
    modalBoxClose: {
        width: "13%"
    },
    modalBoxContent: {

    }
});