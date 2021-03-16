import React from 'react';
import { View, Modal, Text, Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default class SearcherComponent extends React.Component
{
    constructor(props) {
        super(props);
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
                        
                        <View style={styles.modalClose}>
                            <Pressable onPress={() => this.props.changeModalVisibility(false)}>
                                <Icon name='close' color="#fff"></Icon>
                            </Pressable>
                        </View>

                        <View style={styles.modalContentView}>
                            <Text>Wpisz miejscowość</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 44
    },
    modalBox: {
        margin: 50,
        backgroundColor: "#0099ff",
        borderRadius: 5,
        padding: 10,
    },
    modalClose: {
        alignItems: "center",
    },
    modalContentView: {
        alignItems: "center",
    }
});