// @ts-check
import React, {Component} from 'react';
import {
    View, Text
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import NewsTab from './NewsTab';
import EventsTab from './EventsTab';
import TimetablesTab from './TimetablesTab';

import { primary } from '../styles/main';

export default TabNavigator(
    {
        News: NewsTab,
        Timetables: TimetablesTab,
        Events: EventsTab
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#cece',
            style: {
                backgroundColor: primary
            },
            indicatorStyle: {
                backgroundColor: 'white'
            },
        }
    }
)