import React, { useRef, useState } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Pressable, TextInput } from 'react-native';
import { Carro } from './Carro';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CarroView = ({ carro, removerCarro }) => {
    const pan = useRef(new Animated.Value(0)).current;

    let voltar = () => {
        setAberto(false);
        Animated.spring(pan, {
            toValue: 0,
            bounciness: 0,
            useNativeDriver: false,
        }).start();
    };

    let ir = () => {
        setAberto(true);
        Animated.spring(pan, {
            toValue: -100,
            useNativeDriver: false,
        }).start();
    };
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 20,
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx < 0) {
                    pan.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -50) {
                    ir();
                } else {
                    voltar();
                }
            },
        })
    ).current;

    let [aberto, setAberto] = useState(false);
    let [editing, setEditing] = useState(false);
    const [placa, setPlaca] = useState(carro.placa);
    let placaAntiga = carro.placa;

    const handleEdit = () => {
        voltar();
        placaAntiga = placa;
        setEditing(true);
    };

    const handleCancel = () => {
        setPlaca(placaAntigo);
        setEditing(false);
    };

    const handleConfirm = () => {
        carro.placa = placa;
        setEditing(false);
    };

    return (carro ?
        <View style={styles.itemContainer}>
            <View style={styles.hiddenContainer}>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Pressable onPress={handleEdit} android_ripple={{ color: '#4a4857' }}>
                        <Icon name="edit" size={24} color="#f2ecff" style={styles.icon} />
                    </Pressable>
                    <Pressable onPress={() => removerCarro(carro)} android_ripple={{ color: '#4a4857' }}>
                        <Icon name="delete" size={24} color="#f2ecff" style={styles.icon} />
                    </Pressable>
                </View>
            </View>
            <Animated.View
                style={[styles.animatedContainer, { transform: [{ translateX: pan }] }]}
                {...panResponder.panHandlers}
            >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, paddingVertical: 30, alignItems: 'center' }}>
                    {editing ? (
                        <TextInput
                            style={styles.placaInput}
                            value={placa}
                            onChangeText={setPlaca}
                            autoFocus />
                    ) : (
                        <Text style={styles.placa}>{placa}</Text>
                    )}
                    {editing ? (
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable onPress={handleCancel} android_ripple={{ color: '#4a4857' }}>
                                <Icon name="close" size={24} color="#333" style={styles.icon} />
                            </Pressable>
                            <Pressable onPress={handleConfirm} android_ripple={{ color: '#00c896' }}>
                                <Icon name="check" size={24} color="#00c896" style={styles.icon} />
                            </Pressable>
                        </View>
                    ) : (
                        <Pressable onPress={aberto ? voltar : ir}>
                            <Icon name={aberto ? "keyboard-arrow-right" : "keyboard-arrow-left"} size={24} color="#333" style={styles.icon} />
                        </Pressable>
                    )}
                </View>
            </Animated.View>
        </View> : null
    );
};
const styles = StyleSheet.create({
    animatedContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        verticalAlign: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    hiddenContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        verticalAlign: 'center',
        backgroundColor: '#00a97f',
    },
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
        overflow: 'hidden',
        flex: 1,
    },
    placa: {
        fontSize: 18,
        fontFamily: 'Nunito_500Regular',
        color: '#333',
    },
    placaInput: {
        fontSize: 18,
        fontFamily: 'Nunito_500Regular',
        color: '#333',
        flex: 1,
    },
    icon: {
        marginLeft: 15,
    },
});

export { CarroView };
