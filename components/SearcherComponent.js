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
                <Modal style={styles.modalView}
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.changeModalVisibility(false);
                    }}
                >
                    <View style={styles.modalBox}>
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
                    <View style={styles.modalContentView}>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        marginTop: 44
    },
    modalBox: {
        //flex: 1,
        //flexDirection: "row",
        //flexWrap: "wrap",
        //flexGrow: 4,
        margin: 50,
        backgroundColor: "#0099ff",
        borderRadius: 5,
        padding: 10,
    },
    modalBoxLocation: {
        //alignSelf: "flex-end"
    },
    modalBoxInput: {
        justifyContent: "center",
        height: 40,
        width: "auto",
        borderWidth: 1
    },
    modalBoxClose: {
        alignItems: "flex-end",
    },
    modalContentView: {
        alignItems: "center",
    }
});