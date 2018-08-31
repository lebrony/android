// @ts-check
import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity
} from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TimetablesTab extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem style={{ backgroundColor: '#ccc' }} itemDivider>
                            <Text>Exams</Text>
                        </ListItem>
                        <TimetableListItem navigation={navigation} name="Exams" />

                        <ListItem style={{ backgroundColor: '#ccc' }} itemDivider>
                            <Text>Certificates</Text>
                        </ListItem>
                        <TimetableListItem navigation={navigation} name="BTCBM" />
                        <TimetableListItem navigation={navigation} name="BTCA" />
                        <TimetableListItem navigation={navigation} name="BTCCIT" />
                        <TimetableListItem navigation={navigation} name="BTCCCS" />

                        <ListItem style={{ backgroundColor: '#ccc' }} itemDivider>
                            <Text>Diploma</Text>
                        </ListItem>
                        <TimetableListItem navigation={navigation} name="ODPLM" />
                        <TimetableListItem navigation={navigation} name="ODA" />
                        <TimetableListItem navigation={navigation} name="ODFB" />
                        <TimetableListItem navigation={navigation} name="ODIT" />
                        <TimetableListItem navigation={navigation} name="ODCS" />

                        <ListItem style={{ backgroundColor: '#ccc' }} itemDivider>
                            <Text>Bachelors I</Text>
                        </ListItem>
                        <TimetableListItem navigation={navigation} name="BA I" />
                        <TimetableListItem navigation={navigation} name="BBM I" />
                        <TimetableListItem navigation={navigation} name="BCS I" />
                        <TimetableListItem navigation={navigation} name="BFB I" />
                        <TimetableListItem navigation={navigation} name="BPML I" />
                        <TimetableListItem navigation={navigation} name="BM I" />

                        <ListItem style={{ backgroundColor: '#ccc' }} itemDivider>
                            <Text>Bachelors II</Text>
                        </ListItem>
                        <TimetableListItem navigation={navigation} name="BA II" />
                        <TimetableListItem navigation={navigation} name="BBM II" />
                        <TimetableListItem navigation={navigation} name="BCS II" />
                        <TimetableListItem navigation={navigation} name="BFB II" />
                        <TimetableListItem navigation={navigation} name="BPML II" />
                        <TimetableListItem navigation={navigation} name="BM II" />

                        <ListItem style={{ backgroundColor: '#ccc' }} itemDivider>
                            <Text>Bachelors III</Text>
                        </ListItem>
                        <TimetableListItem navigation={navigation} name="BA III" />
                        <TimetableListItem navigation={navigation} name="BBM III" />
                        <TimetableListItem navigation={navigation} name="BCS III" />
                        <TimetableListItem navigation={navigation} name="BFB III" />
                        <TimetableListItem navigation={navigation} name="BPML III" />
                        <TimetableListItem navigation={navigation} name="BM III" />

                    </List>
                </Content>
            </Container>
        )
    }
}


function TimetableListItem({ name, navigation }) {
    function openTimetable() {
        return navigation.navigate("TimetableDetails", { course: name });
    }
    return (
        <ListItem>
            <TouchableOpacity onPress={openTimetable} activeOpacity={0.3} style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                <Text>{name}</Text>
                <Icon size={22} name="chevron-right" />
            </TouchableOpacity>
        </ListItem>
    )
}