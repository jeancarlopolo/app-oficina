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

const Stack = createStackNavigator();

export default function MeuNavigator() {

    let navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName='App'>
            
            <Stack.Screen
                name="App"
                component={App}
                initialParams={{
                    navigation: navigation,
                }}
            />
            <Stack.Screen
                name="TelaProprietarios"
                component={TelaProprietarios}
                initialParams={{
                    navigation: navigation,
                }}
            />

            <Stack.Screen
                name="TelaCarros"
                component={TelaCarros}
                initialParams={{
                    navigation: navigation,
                }}
            />
        </Stack.Navigator>
    );
}
