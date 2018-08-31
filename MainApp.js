// @ts-check
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'mobx-react/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

import { primary } from './styles/main';

// import Entries from './stores/entries';

// Screens
import Home from './views/Home';
import Login from './views/Login';
import TimetableDetails from './views/TimetableDetails';
import NewsPage from './views/NewsPage';


const Stack = createStackNavigator(
    {
        Login: Login,
        TimetableDetails: TimetableDetails,
        NewsPage: NewsPage,
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => {
                return {
                    title: 'IAA',
                    headerRight: <View style={{ flexDirection: 'row' }}>
                        {/* <Ionicons onPress={() => navigation.navigate("Help")} size={24} style={{ marginRight: 14 }} color="white" name="md-help-circle" /> */}
                        <Ionicons onPress={() => {
                        Alert.alert(
                            'Log out',
                            'Are you sure you want to log out?',
                            [
                                {
                                    text: 'Cancel', style: 'cancel'
                                },
                                {
                                    text: 'Log out', onPress: () => firebase.auth().signOut().then(res => {
                                        navigation.replace('Login')
                                    }).catch(error => {
                                        alert("Error signing out");
                                    })
                                }
                            ]
                        )
                    }} size={24} style={{ marginRight: 10 }} color="white" name="md-exit" /></View>,
                    headerStyle: {
                        backgroundColor: primary,
                        elevation: 0
                    },
                    headerTitleStyle: {
                        color: 'white',
                    }
                }
            }
        }
    },
    {
        initialRouteName: 'Login'
    }
);

export default () => <Provider><Stack /></Provider>

// export default Stack;