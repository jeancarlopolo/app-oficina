import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, Pressable, View } from 'react-native';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { ProprietarioView } from './ProprietarioView.js';
import { NovoProprietarioView } from './NovoProprietarioView.js';
import { Checklist } from './Carro.js';
import { ChecklistView } from './ChecklistView.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';


class Checklists extends Component {
    constructor(props) {
        super(props);
        let realProps = props.route.params.props.route.params.props.route.params; //react native kk
        this.state = {
            checklists: realProps.carro.checklists,
            carro: realProps.carro,
            navigator: realProps.navigation,
        };
    }

    atualizarChecklist = (nomeInfo, ok, checklist) => {
        checklist[nomeInfo.toLowerCase()]["status"] = ok ? "ok" : "nok";
        this.setState({ checklists: this.state.carro.checklists });
    }

    adicionarChecklist = (checklist) => {
        this.state.carro.adicionarChecklist(checklist);
        this.setState({ checklists: this.state.carro.checklists });
    }

    removerChecklist = (checklist) => {
        this.state.carro.removerChecklist(checklist);
        this.setState({ checklists: this.state.carro.checklists });
    }


    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.state.checklists}
                    renderItem={({ item }) => <ChecklistView checklist={item} navigation={this.state.navigator} removerChecklist={this.removerChecklist} placa={this.state.carro.placa} atualizarChecklist={this.atualizarChecklist} />}
                    keyExtractor={(item, index) => index.toString()}
                />

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
                    onPress={() => this.adicionarChecklist(new Checklist(
                        { "status": "ok", "comentario": "Tudo certo" },
                        { "status": "ok", "comentario": "Tudo certo" },
                        { "status": "ok", "comentario": "Tudo certo" },
                        { "status": "ok", "comentario": "Tudo certo" },
                        { "status": "ok", "comentario": "Tudo certo" }
                    ))}

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

const ChecklistStack = createStackNavigator();

function TelaChecklists() {
    return (
        <ChecklistStack.Navigator>
        </ChecklistStack.Navigator>
    );
}

export { TelaChecklists, Checklists };