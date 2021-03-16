import React from 'react';
import { Header } from 'react-native-elements';

export default class HeaderComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.triggerModal = this.triggerModal.bind(this);
    }

    triggerModal() {
        this.props.changeModalVisibility(true);
    }

    render() {
        return(
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Moja aplikacja', style: { color: '#fff' } }}
                rightComponent={{ icon: 'search', color: '#fff', onPress: this.triggerModal }}
            />
        )
    }
}