import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, Pressable, View } from 'react-native';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { ProprietarioView } from './ProprietarioView.js';
import { NovoProprietarioView } from './NovoProprietarioView.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { InfoCarro } from './InfoCarro.js';
import { Checklist } from './Carro.js';
import { CheckView } from './CheckView.js';


class InfoChecklist extends Component {
    constructor(props) {
        super(props);
        let realProps = props.route.params;
        console.log(realProps.checklist);
    this.state = {
        checklist: realProps.checklist,
        infos: ["Suspensao", "Pneus", "Agua", "Oleo", "Mangueiras"]
    };
}

render() {
    return (
        <View style={styles.container} >
            <ScrollView style={styles.container} horizontal={false} scrollEnabled={true}>
                <FlatList
                    data={this.state.infos}
                    renderItem={({ item }) => 
                        <CheckView 
                            nomeInfo={item} 
                            informacao={this.state.checklist[item.toLowerCase()]["comentario"]} 
                            status={this.state.checklist[item.toLowerCase()]["status"]} 
                            atualizarChecklist={this.props.route.params.atualizarChecklist}
                            checklist={this.state.checklist} 
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
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

export { InfoChecklist };