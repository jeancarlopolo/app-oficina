import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, Pressable, View } from 'react-native';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { ProprietarioView } from './ProprietarioView.js';
import { NovoProprietarioView } from './NovoProprietarioView.js';
import Icon from 'react-native-vector-icons/MaterialIcons';


class TelaProprietarios extends Component {
    constructor(route) {
        super(route);
        this.state = {
            proprietarios: route.proprietarioService.listarProprietarios(),
            criando: false,
            proprietarioService: route.proprietarioService,
        };
    }

    adicionarProprietario = (nome) => {
        let proprietario = new Proprietario(nome, this.state.proprietarioService);
        proprietario.adicionarProprietario(this.state.proprietarioService);
        this.setState({ proprietarioService: proprietario.proprietarioService , criando: false});
    }

    cancelar = () => {
        this.setState({ criando: false });
    }

    render() {
        return (
            <View style={styles.container} >
                <ScrollView style={styles.container} horizontal={false}>
                    <FlatList
                        data={this.state.proprietarios}
                        renderItem={({ item }) => <ProprietarioView proprietario={item}
                            removerProprietario={this.props.removerProprietario}
                            navigation={this.props.navigation}
                        />}
                        keyExtractor={item => item.id}
                    />
                    {(this.state.criando) && (
                        <NovoProprietarioView
                            adicionarProprietario={this.adicionarProprietario}
                            cancelar={this.cancelar}
                            proprietarioService={this.state.proprietarioService}
                        />
                    )}

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

export { TelaProprietarios };