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
        this.citiesList = [
            /*{
                key: "ASD"
            }*/
        ];
    }

    onChange(val) {
        this.currentCity = val;
        console.log(val);
    }

    getByCurrentLocation() {
        this.props.getCitiesByLocation(this.props.location.coords.latitude, this.props.location.coords.longitude).then((res) => {
            this.citiesList = res.data.list;
            this.listRefresh = true;
            //console.log(this.citiesList);
        });
    }

    clickOnValue(id) {
        console.log(id);
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
                                        //onChangeText={this.currentCity}
                                        placeholder="Wpisz miejścowość"
                                    ></TextInput>
                                </View>

                                <View style={styles.modalBoxClose}>
                                    <Pressable onPress={() => {
                                        this.props.changeModalVisibility(false);
                                        this.listRefresh = false;
                                        //this.citiesList = [];
                                    }}>
                                        <Icon name='close' color="#fff"></Icon>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        <View style={styles.modalBoxContent}>
                            <FlatList
                                data={this.citiesList}
                                renderItem={({item}) => 
                                    <Pressable onPress={() => {
                                        this.clickOnValue(item.id);
                                    }}>
                                        <Text style={styles.modalBoxInputValue}>{item.name}</Text>
                                    </Pressable>
                                }
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
    modalBoxInputValue: {
        marginTop: "8%",
        alignSelf: "center"
    },
    modalBoxClose: {
        width: "13%"
    },
    modalBoxContent: {

    }
});