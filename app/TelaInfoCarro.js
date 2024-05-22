import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, Pressable, View } from 'react-native';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { ProprietarioView } from './ProprietarioView.js';
import { NovoProprietarioView } from './NovoProprietarioView.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { InfoCarro } from './InfoCarro.js';


class TelaInfoCarro extends Component {
    constructor(props) {
        super(props);
        let realProps = props.route.params.props.route.params; //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK react native
        this.state = {
            carro: props.route.params.carro,
            infos: [
                <InfoCarro nomeInfo='Cor' informacao={realProps.carro.cor} carro={realProps.carro} icone="palette" atualizarCarro={realProps.atualizarCarros}/>,
            <InfoCarro nomeInfo='Placa' informacao={realProps.carro.placa} carro={realProps.carro} icone="confirmation-number" atualizarCarro={realProps.atualizarCarros} />,
            <InfoCarro nomeInfo='Modelo' informacao={realProps.carro.modelo} carro={realProps.carro} icone="directions-car" atualizarCarro={realProps.atualizarCarros}/>,
            <InfoCarro nomeInfo='Motorista' informacao={realProps.carro.motorista} carro={realProps.carro} icone="person" atualizarCarro={realProps.atualizarCarros}/>,
            <InfoCarro nomeInfo='Proprietário' informacao={realProps.proprietario.nome} carro={realProps.carro} icone="person" atualizarCarro={realProps.atualizarCarros}/>],
        };
    }

    render() {
        return (
            <View style={styles.container} >
                <ScrollView style={styles.container} horizontal={false} scrollEnabled={true}>
                    <FlatList
                        data={this.state.infos}
                        renderItem={({ item }) => item}
                        keyExtractor={(item, index) => index}
                    />
                </ScrollView>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2ecff',
        padding: 10,
        flexDirection: 'column',
    },
    info: {
        fontSize: 18,
        fontFamily: 'Nunito_500Regular',
        color: '#333',
    },
    nomeInfo: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        color: '#333',
    },
});

export { TelaInfoCarro };