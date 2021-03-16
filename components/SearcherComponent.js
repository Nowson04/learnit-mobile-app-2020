import React from 'react';
import { View, Modal, Text, Pressable, StyleSheet } from 'react-native';

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
                    <View style={styles.modalContentView}>
                        <Text>ASD</Text>
                        <Pressable
                            onPress={() => this.props.changeModalVisibility(false)}
                        >
                            <Text>Ukryj modal</Text>
                        </Pressable>
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
        alignItems: "center",
        marginTop: 44
    },
    modalContentView: {
        margin: 20,
        backgroundColor: "blue",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});