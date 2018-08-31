// @ts-check
import React, { Component } from 'react';
import {
    View, TouchableOpacity, Dimensions, StatusBar
} from 'react-native';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import { Container, Content, ListItem, Thumbnail, Body, Text, List, Spinner } from 'native-base';

import { primary } from '../styles/main';

// @ts-ignore
const logo = require("../assets/logo.png");

const { width, height } = Dimensions.get("window");

const newsItem = {
    title: "News Item"
}

export default class NewsTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            newsItems: []
        }
    }
    componentDidMount() {
        firebase.firestore().collection("news").onSnapshot(snap => {
            const items = [];
            snap.forEach(child => {
                const item = child.data();
                item["id"] = child.id;
                items.push(item)
            })
            this.setState({ newsItems: items, loading: false });
        });
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <StatusBar
                    backgroundColor={primary}
                    barStyle="light-content"
                />
                <Content>
                    {
                        this.state.loading ? (
                            <View style={{ height, width, justifyContent: 'center' }}>
                                <Spinner />
                            </View>
                        ) : <View></View>
                    }
                    <List>
                        {
                            _.map(this.state.newsItems, item => (
                                <NewsItem key={item.id} newsItem={item} navigation={navigation} />
                            ))
                        }
                    </List>
                </Content>
            </Container>
        )
    }
}



function NewsItem({ navigation, newsItem }) {
    function openNews() {
        navigation.navigate("NewsPage", { title: newsItem.title, newsItem })
    }
    return (
        <ListItem>
            <TouchableOpacity onPress={openNews} activeOpacity={0.5} style={{ flex: 1, flexDirection: 'row' }}>
                <Thumbnail square size={80} source={newsItem.imageURL ? { uri: newsItem.imageURL } : logo} />
                <Body>
                    <Text>{newsItem.title}</Text>
                    <Text numberOfLines={1} note>{newsItem.text}</Text>
                </Body>
            </TouchableOpacity>
        </ListItem>
    )
}