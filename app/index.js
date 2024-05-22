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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Checklists } from './TelaChecklists.js';
import { InfoChecklist } from './InfoChecklist.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function InfoCarroTabs(props) {
    let navigation = useNavigation();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Informações do Carro') {
                    iconName = 'car';
                } else if (route.name === 'Checklists') {
                    iconName = 'clipboard-check';
                }

                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
        })}>
            <Tab.Screen name="Informações do Carro" component={TelaInfoCarro} initialParams={{ navigation: navigation, props:props }}options={{headerShown: false}} />
            <Tab.Screen name="Checklists" component={StackChecklists} initialParams={{ navigation: navigation, props:props }} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}

function StackChecklists(props) {
    let navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName='Lista de Checklists'>
            <Stack.Screen
                name="Lista de Checklists"
                component={Checklists}
                initialParams={{ navigation: navigation, props: props }}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Checklist"
                component={InfoChecklist}
                initialParams={{ navigation: navigation, props: props }}
            />
        </Stack.Navigator>
    );
}

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
                name="Carro"
                component={InfoCarroTabs}
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

