// @ts-check
import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, Button, Dimensions, ToastAndroid
} from 'react-native';
import { Container, Content, List, ListItem, Card } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import { primary } from '../styles/main';
import RNFetchBlob from 'rn-fetch-blob'

const { width, height } = Dimensions.get("window");

export default class TimetableDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.course}`,
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: primary,
            color: 'white'
        },
    });
    constructor(props) {
        super(props);

        this.state = {

        }

        this.downloadTimeTable = this.downloadTimeTable.bind(this);
    }
    downloadTimeTable() {
        // const path = firebase.storage.Native.EXTERNAL_STORAGE_DIRECTORY_PATH;
        // console.warn(path)
        // firebase.storage().ref('/WhatsApp Image 2018-06-01 at 06.36.53.jpeg').downloadFile(`/timetable.jpeg`)
        //     .then((res) => {
        //         ToastAndroid.show("Timetable downloaded", ToastAndroid.SHORT);
        //     })
        //     .catch(error => {
        //         ToastAndroid.show("Error downloading timetable. Try again", ToastAndroid.SHORT);
        //     });
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob.config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                // fileCache: true,
                addAndroidDownloads : {
                    useDownloadManager : true,
                },
                
                path : dirs.DownloadDir + '/timetable.jpeg'
            }).fetch('GET', 'https://firebasestorage.googleapis.com/v0/b/iaaapp-5234d.appspot.com/o/WhatsApp%20Image%202018-06-01%20at%2006.36.53.jpeg?alt=media&token=60c947c8-7463-4bb7-bce8-0f567e23b3e2', {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                console.warn('The file saved to ', res.path())
            })
    }
    componentDidMount() {
        const entryType = this.props.navigation.getParam("course", "Time Table");
    }
    render() {
        return (
            <Container>
                <Content>
                    <Card style={{ marginTop: 15 }}>
                        <View style={{ width: width, height: height / 2.6 }}>
                            <Image style={{ height: '100%' }} resizeMode="contain" source={{ uri: "https://firebasestorage.googleapis.com/v0/b/iaaapp-5234d.appspot.com/o/WhatsApp%20Image%202018-06-01%20at%2006.36.53.jpeg?alt=media&token=60c947c8-7463-4bb7-bce8-0f567e23b3e2" }} />
                        </View>

                        <View style={{ padding: 15 }}>
                            <Button onPress={this.downloadTimeTable} title="Download" />
                        </View>
                    </Card>
                </Content>
            </Container>
        )
    }
}