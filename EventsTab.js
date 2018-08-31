// @ts-check
import React, { Component } from 'react';
import {
    View, Text, Dimensions
} from 'react-native';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import { Container, Content, Spinner } from 'native-base';
import { Button, Card  } from 'react-native-elements'


const { width, height } = Dimensions.get("window");
// @ts-ignore
const logo = require('../assets/logo.png');

export default class EventsTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: []
        }
    }
    componentDidMount() {
        firebase.firestore().collection("events").onSnapshot(snap => {
            const events = [];
            snap.forEach(child => {
                const event = child.data();
                event["id"] = child.id;
                events.push(event)
            })
            this.setState({ events, loading: false });
        });
    }
    render() {
        return (
            <Container>
                <Content>
                    {
                        this.state.loading ? (
                            <View style={{ height: height / 2, width, justifyContent: 'center' }}>
                                <Spinner />
                            </View>
                        ) : <View></View>
                    }
                    {
                        _.map(this.state.events, event => (
                            <EventItem event={event} key={event.id} />
                        ))
                    }
                </Content>
            </Container>
        )
    }
}


function EventItem({ event, key }) {
    return (
        <Card
            title={event.title}
            image={event.imageURL ? { uri: event.imageURL } : logo}>
            <Text style={{ marginBottom: 10 }}>
                {event.text}
            </Text>
            {/* <Button
                icon={{ name: 'code' }}
                backgroundColor='#03A9F4'
                fontFamily='Lato'
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='VIEW NOW' /> */}
        </Card>
    )
}