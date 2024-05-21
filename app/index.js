import React, { Component, useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Carro, Checklist } from './Carro.js';
import { Proprietario, ProprietarioService } from './Proprietario.js';
import { TelaCarros } from './TelaCarros.js';
import { TelaProprietarios } from './TelaProprietarios.js';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { App } from './App.js';
import * as Font from 'expo-font';
import { TelaInfoCarro } from './TelaInfoCarro.js';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function MeuNavigator() {

    let navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName='App'>

            <Stack.Screen
                name="Gerenciador de Oficina"
                component={App}
                initialParams={{
                    navigation: navigation,
                }}
            />
            <Stack.Screen
                name="Informações do Carro"
                component={TelaInfoCarro}
                initialParams={{
                    navigation: navigation,
                }}
            />


            <Stack.Screen
                name="Carros"
                component={TelaCarros}
                initialParams={{
                    navigation: navigation,
                }}
            />
        </Stack.Navigator>
    );
}
