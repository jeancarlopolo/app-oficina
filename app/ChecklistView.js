import React, { useRef, useState } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Pressable, TextInput } from 'react-native';
import { Checklist } from './Carro';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { InfoChecklist } from './InfoChecklist';


const ChecklistView = ({ checklist, removerChecklist, navigation, placa, atualizarChecklist }) => {
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

    const handlePress = () => {
        navigation.navigate('Checklist', { checklist: checklist, atualizarChecklist: atualizarChecklist});
    }


    const handleClipboard = () => {
        Clipboard.setString(checklist.exportarClipboard(placa));

    }


    return (checklist ?
        <View style={styles.itemContainer}>
            <View style={styles.hiddenContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={handleClipboard} android_ripple={{ color: '#4a4857' }}>
                        <Icon name="content-copy" size={24} color="#f2ecff" style={styles.icon} />
                    </Pressable>
                    <Pressable onPress={() => removerChecklist(checklist)} android_ripple={{ color: '#4a4857' }}>
                        <Icon name="delete" size={24} color="#f2ecff" style={styles.icon} />
                    </Pressable>
                </View>
            </View>
            <Animated.View
                style={[styles.animatedContainer, { transform: [{ translateX: pan }] }]}
                {...panResponder.panHandlers}
            >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, paddingVertical: 30, alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Pressable onPress={handlePress}>
                            <Icon name="check" size={30} color="#333" style={styles.icon} />
                        </Pressable>
                        <Text style={styles.nome} selectable={false}>{checklist.dataCriacao}</Text>
                    </View>

                    <Pressable onPress={aberto ? voltar : ir}>
                        <Icon name={aberto ? "keyboard-arrow-right" : "keyboard-arrow-left"} size={24} color="#333" style={styles.icon} />
                    </Pressable>
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
    nome: {
        fontSize: 18,
        fontFamily: 'Nunito_500Regular',
        color: '#333',
    },
    nomeInput: {
        fontSize: 18,
        fontFamily: 'Nunito_500Regular',
        color: '#333',
        flex: 1,
    },
    icon: {
        marginRight: 15,
    },
});

export { ChecklistView };
