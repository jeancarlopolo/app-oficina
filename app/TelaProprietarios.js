import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Icon } from 'react-native';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { ProprietarioView } from './ProprietarioView.js';

class TelaProprietarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proprietarios: props.proprietarioService.listarProprietarios()
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.proprietarios}
                    renderItem={({ item }) => <ProprietarioView proprietario={item} removerProprietario={this.props.removerProprietario} />}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2ecff',
        padding: 10,
    },
});

export { TelaProprietarios };