import React, { Component, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Carro, Checklist } from './Carro.js';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { TelaProprietarios } from './TelaProprietarios.js';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

const Stack = createStackNavigator();
const fetchFonts = () => {
    return Font.loadAsync({
        'Nunito_500Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    });
};


// isso aqui é uma massa de manobra
// um fantasma do passado
// o navigation possuiu literalmente tudo que o app tinha e eu nao sei como isso aconteceu.
class App extends Component {
    constructor(route) {
        super(route);

        this.state = {
            proprietarioService: new ProprietarioService(),
            criandoProprietario: false,
            navigation: route.navigation,
        };

    }

    adicionarProprietario = (nome) => {
        let p = new Proprietario(nome, this.state.proprietarioService);
        p.adicionarProprietario(this.state.proprietarioService);
        this.setState({proprietarioService: this.state.proprietarioService, criandoProprietario: false})
    }
     removerProprietario = (proprietario) => {
        this.state.proprietarioService.removerProprietario(proprietario);
        this.setState({proprietarioService: this.state.proprietarioService, criandoProprietario: false})
    }


   
    componentDidMount() {
        fetchFonts();
        // proprietário de exemplo 1
        let marquinhos = new Proprietario('Relâmpago Marquinhos', this.state.proprietarioService);
        let carro1 = new Carro('ABC1234', 'Fusca', 'Azul', marquinhos.id, 'Rodolfo Rodas');
        let checklist1 = new Checklist({ status: 'ok', comentario: 'tudo certo' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok', comentario: 'tudo certo' }, { status: 'nok', comentario: 'trocar' }, { status: 'nok', comentario: 'trocar' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok', comentario: 'tudo certo' });
        carro1.adicionarChecklist(checklist1);
        marquinhos.adicionarCarro(carro1);
        let carro2 = new Carro('DEF5678', 'Onix', 'Preto', marquinhos.id, 'Augusto Acelera');
        let checklist2 = new Checklist({ status: 'ok' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok', comentario: 'troquei' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok', comentario: 'tudo certo' });
        carro2.adicionarChecklist(checklist1);
        carro2.adicionarChecklist(checklist2);
        marquinhos.adicionarCarro(carro2);

        // proprietário de exemplo 2
        let toretto = new Proprietario('Dominic Toretto', this.state.proprietarioService);
        let carro3 = new Carro('GHI9012', 'Charger', 'Prata', toretto.id, 'Vin Diesel');
        let carro4 = new Carro('JKL3456', 'Eclipse', 'Branco', toretto.id, 'Dwayne Johnson');
        toretto.adicionarCarro(carro3);
        toretto.adicionarCarro(carro4);

        // proprietário de exemplo 3 (vazio)
        let travis = new Proprietario('Travis Bickle', this.state.proprietarioService);

        this.state.proprietarioService.adicionarProprietario(marquinhos);
        this.state.proprietarioService.adicionarProprietario(toretto);
        this.state.proprietarioService.adicionarProprietario(travis);
    }





    render() { // gambiarra dolorosa pra fazer o navigation funcionar
        return (<TelaProprietarios proprietarioService={this.state.proprietarioService} navigation={this.state.navigation} adicionarProprietario={this.adicionarProprietario} removerProprietario={this.removerProprietario} />
            
        );
    }
}

export { App };