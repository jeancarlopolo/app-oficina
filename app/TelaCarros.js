import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, Pressable, View } from 'react-native';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { Carro, Checklist } from './Carro.js';
import { CarroView } from './CarroView.js';
import { ProprietarioView } from './ProprietarioView.js';
import { NovoProprietarioView } from './NovoProprietarioView.js';
import Icon from 'react-native-vector-icons/MaterialIcons';


class TelaCarros extends Component {
    constructor(route) {
        super(route);
        this.state = {
            carros: route.params.proprietario.listarCarros(),
            proprietario: route.params.proprietario,
            criando: false,
        };
    }

    adicionarCarro = (placa, modelo, cor, motorista) => {
        let carro = new Carro(placa, modelo, cor, this.state.proprietario, motorista);
        this.setState({ proprietario: this.state.proprietario, criando: false });
    }

    cancelar = () => {
        this.setState({ criando: false });
    }

    render() {
        return (
            <View style={styles.container} >
                <ScrollView style={styles.container} horizontal={false}>
                    <FlatList
                        data={this.state.carros}
                        renderItem={({ item }) => <CarroView carro={item}
                            removerProprietario={this.props.removerCarro}
                            navigation={this.props.navigation}
                        />}
                        keyExtractor={item => item.id}
                    />
                    {/* {(this.state.criando) && (
                        <NovoCarroView // FAZER PARTE DO CARRO NOVO
                            adicionarProprietario={this.adicionarProprietario}
                            cancelar={this.cancelar}
                        />
                    )} */}

                </ScrollView>
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
                    onPress={() => this.setState({ criando: !this.state.criando })}

                    android_ripple={{ color: '#00a97f' }}
                >
                    <Icon name="add" size={30} color="f2ecff" />
                </Pressable></View>
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
});

export { TelaCarros };