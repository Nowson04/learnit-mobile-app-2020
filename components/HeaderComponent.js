import React from 'react';
import { Header } from 'react-native-elements';
//import NavigationBar from 'react-native-navbar-color';

export default class HeaderComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.triggerModal = this.triggerModal.bind(this);
        this.bgColor = '#0099ff';

        //console.log(NavigationBar.getAPILevel);
        //NavigationBar.setColor(this.bgColor);
    }

    triggerModal() {
        this.props.changeModalVisibility(true);
    }

    render() {
        return(
            <Header
                containerStyle={{
                    //backgroundColor: this.bgColor
                }}
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Moja aplikacja', style: { color: '#fff' } }}
                rightComponent={{ icon: 'search', color: '#fff', onPress: this.triggerModal }}
            />
        )
    }
}