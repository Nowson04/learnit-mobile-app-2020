import React from 'react';
import { View, Modal, Text, Pressable, StyleSheet, FlatList,TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

export default class SearcherComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.currentCity = NaN;
        this.listRefresh = false;
        this.onChange = this.onChange.bind(this);
        this.citiesList = [];
    }

    onChange(val) {
        this.currentCity = val;
        console.log(val);
    }

    getByCurrentLocation() {
        this.props.getCitiesByLocation(this.props.location.coords.latitude, this.props.location.coords.longitude).then((res) => {
            res.data.list.forEach(elem => {
                //console.log(elem.name + " | " + elem.id + " | " + elem.coord.lat + " | " + elem.coord.lon);
                this.citiesList.push({key: elem.name});
            });
            this.listRefresh = true;
            console.log(this.citiesList);
        });
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
                                    <Pressable onPress={() => this.getByCurrentLocation()}>
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
                            <FlatList
                                data={this.citiesList}
                                renderItem={({item}) => <Text>{item.key}</Text>}
                                extraData={this.listRefresh}
                            />
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
        height: "7%"
    },
    modalFlexContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    },
    modalBoxLocation: {
        width: "13%",
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
        marginTop: 15
    }
});