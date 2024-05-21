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
        console.log(props.route.params.carro);
        this.state = {
            carro: props.route.params.carro,
            infos: [
                <InfoCarro nomeInfo='Cor' informacao={props.route.params.carro.cor} carro={props.route.params.carro} icone="palette" atualizarCarro={props.route.params.atualizarCarros}/>,
            <InfoCarro nomeInfo='Placa' informacao={props.route.params.carro.placa} carro={props.route.params.carro} icone="confirmation-number" atualizarCarro={props.route.params.atualizarCarros} />,
            <InfoCarro nomeInfo='Modelo' informacao={props.route.params.carro.modelo} carro={props.route.params.carro} icone="directions-car" atualizarCarro={props.route.params.atualizarCarros}/>,
            <InfoCarro nomeInfo='Motorista' informacao={props.route.params.carro.motorista} carro={props.route.params.carro} icone="person" atualizarCarro={props.route.params.atualizarCarros}/>,
            <InfoCarro nomeInfo='Proprietário' informacao={props.route.params.proprietario.nome} carro={props.route.params.carro} icone="person" atualizarCarro={props.route.params.atualizarCarros}/>],
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