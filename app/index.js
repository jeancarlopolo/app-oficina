import React, { Component, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Carro, Checklist } from './Carro.js';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { TelaProprietarios } from './TelaProprietarios.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';

const fetchFonts = () => {
    return Font.loadAsync({
        'Nunito_500Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    });
};



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            proprietarioService: new ProprietarioService(),
        };

    }
    removerProprietario = (proprietario) => {
        this.state.proprietarioService.removerProprietario(proprietario);
        this.setState({ proprietarioService: proprietario.proprietarioService});
      }

    componentDidMount() {
        fetchFonts();
        // proprietário de exemplo 1
        let marquinhos = new Proprietario('Relâmpago Marquinhos', this.state.proprietarioService);
        let carro1 = new Carro('ABC1234', 'Fusca', 'Azul', marquinhos, 'Rodolfo Rodas');
        let checklist1 = new Checklist({ status: 'ok', comentario: 'tudo certo' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok', comentario: 'tudo certo' }, { status: 'nok', comentario: 'trocar' }, { status: 'nok', comentario: 'trocar' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok', comentario: 'tudo certo' });
        carro1.adicionarChecklist(checklist1);
        marquinhos.adicionarCarro(carro1);
        let carro2 = new Carro('DEF5678', 'Onix', 'Preto', marquinhos, 'Augusto Acelera');
        let checklist2 = new Checklist({ status: 'ok' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok', comentario: 'troquei' }, { status: 'nok', comentario: 'trocar' }, { status: 'ok', comentario: 'tudo certo' });
        carro2.adicionarChecklist(checklist1);
        carro2.adicionarChecklist(checklist2);
        marquinhos.adicionarCarro(carro2);

        // proprietário de exemplo 2
        let toretto = new Proprietario('Dominic Toretto', this.state.proprietarioService);
        let carro3 = new Carro('GHI9012', 'Charger', 'Preto', toretto, 'Vin Diesel');
        toretto.adicionarCarro(carro3);

        // proprietário de exemplo 3 (vazio)
        let travis = new Proprietario('Travis Bickle', this.state.proprietarioService);
    }





    render() {
        return (
            <View style={{ flex: 1 }}>
                <TelaProprietarios proprietarioService={this.state.proprietarioService} removerProprietario={this.removerProprietario} />
                <Pressable
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        bottom: 30,
                        right: 10,
                        height: 70,
                        backgroundColor: '#00a97f',
                        borderRadius: 100,
                    }}
                    android_ripple={{ color: '#00a97f' }}
                >
                    <Icon name="add" size={30} color="f2ecff" />
                </Pressable>
            </View>
        );
    }
}
export default App;