import React, { useRef, useState } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Proprietario } from './Proprietario';

const NovoCarroView = ({ adicionarCarro, cancelar, proprietario }) => {
    const [nome, setNome] = useState('');

    return (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15, alignItems: 'center', flex:1 }}>
                {(
                    <TextInput
                        style={styles.nomeInput}
                        value={nome}
                        onChangeText={setNome}
                        autoFocus />
                )}

                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={cancelar}>
                        <Icon name={"close"} size={24} color="#333" style={styles.icon} />
                    </Pressable>

                    <Pressable onPress={() => {
                        adicionarCarro(nome, "Gol", "Branco", proprietario.nome);
                        setNome('');
                    }}>
                        <Icon name={"check"} size={24} color="#333" style={styles.icon} />
                    </Pressable>
                </View>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        verticalAlign: 'center',
        backgroundColor: '#f2ecff',
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        padding: 15,
        overflow: 'hidden',
    },
    nome: {
        fontSize: 18,
        fontFamily: 'Nunito_500Regular',
        fontWeight: '300',
        color: '#333',
    },
    nomeInput: {
        fontSize: 18,
        fontFamily: 'Nunito_500Regular',
        color: '#333',
        flex: 1,
    },
    icon: {
        marginLeft: 15,
    },
});

export { NovoCarroView };
