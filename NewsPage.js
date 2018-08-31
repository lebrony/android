// @ts-check
import React, { Component } from 'react';
import {
    View, Text, Image, Dimensions
} from 'react-native';

import { Container, Content } from 'native-base';
import { primary } from '../styles/main';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get("window");
// @ts-ignore
const logo = require('../assets/logo.png');


export default class NewsPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: primary,
            color: 'white'
        },
    });
    render() {
        const newsItem = this.props.navigation.state.params.newsItem;
        return (
            <Container>
                <Content>
                    <View style={{ height: height / 2, backgroundColor: '#ccc', alignItems: 'center' }} >
                        <Image resizeMode="contain" style={{ height: height / 2, width: width / 2 }} source={newsItem.imageURL ? { uri: newsItem.imageURL } : logo}/>
                    </View>
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{newsItem.title}</Text>

                        <Text>
                            {newsItem.text}
                        </Text>
                    </View>
                    
                </Content>
            </Container>
        )
    }
}