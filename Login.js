// @ts-check
import React, { Component } from 'react';
import {
    View, Text, Dimensions, Image, Button, TouchableOpacity, ToastAndroid, StatusBar
} from 'react-native';
import { Container, Content } from 'native-base';
import { FormInput, FormLabel } from 'react-native-elements';

import { primary } from '../styles/main';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get("window");

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            activeView: 'signIn',
            username: "",
            email: "",
            cpassword: "",
            password: ""
        }

        this.toggleActiveView = this.toggleActiveView.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    signIn() {
        const { email, password, loading } = this.state;
        if (loading) {
            ToastAndroid.show("Please wait while loading", ToastAndroid.SHORT);
            return;
        }

        if (email.length < 5) {
            ToastAndroid.show("Please enter a valid email", ToastAndroid.SHORT);
            return;
        }

        if (email.length < 3) {
            ToastAndroid.show("Password is too short", ToastAndroid.SHORT);
            return;
        }

        this.setState({ loading: true });
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password).then(userCredential => {
            this.props.navigation.replace("Home")
        }).catch(error => {
            ToastAndroid.show("Error signing in. Please try again.", ToastAndroid.SHORT);
            this.setState({ loading: false });
        });
    }
    signUp() {
        const { email, password, cpassword, loading } = this.state;
        if (loading) {
            ToastAndroid.show("Please wait while loading", ToastAndroid.SHORT);
            return;
        }

        if (email.length < 5) {
            ToastAndroid.show("Please enter a valid email", ToastAndroid.SHORT);
            return;
        }

        if (email.length < 3) {
            ToastAndroid.show("Password is too short", ToastAndroid.SHORT);
            return;
        }

        if (password != password) {
            ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
            return;
        }

        this.setState({ loading: true });
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password).then(userCredential => {
            this.props.navigation.replace("Home");
        }).catch(error => {
            ToastAndroid.show("Error signing up. Please try again.", ToastAndroid.SHORT);
            this.setState({ loading: false });
        });
    }
    componentDidMount() {
        this.authListener = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.replace("Home");
            } else {
                this.setState({ loading: false })
            }
        })
    }
    componentWillUnmount() {
        if (this.authListener) {
            this.authListener();
        }
    }
    toggleActiveView() {
        this.setState({ activeView: this.state.activeView === "signIn" ? "signUp" : "signIn" });
    }
    render() {
        return (
            <Container>
                <StatusBar
                    backgroundColor={primary}
                    barStyle="light-content"
                />
                <Content>
                    <View style={{ alignItems: 'center', marginTop: height / 10 }}>
                        <Image style={{ width: width / 2.3, height: width / 2.3 }} resizeMode="contain" source={require("../assets/logo.png")} />
                    </View>

                    <View>
                        <FormLabel>Email</FormLabel>
                        <FormInput autoCapitalize={"none"} value={this.state.email} onChangeText={text => this.setState({ email: text })} keyboardType="email-address" />
                    </View>

                    <View>
                        <FormLabel>Password</FormLabel>
                        <FormInput autoCapitalize={"none"} secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({ password: text })} keyboardType="default" />
                    </View>

                    {
                        this.state.activeView === "signUp" ? (
                            <View>
                                <View>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormInput secureTextEntry={true} autoCapitalize={"none"} value={this.state.cpassword} onChangeText={text => this.setState({ cpassword: text })} keyboardType="default" />
                                </View>
                                <View style={{ padding: 15 }}>
                                    <Button color={primary} onPress={this.signUp} title={this.state.loading ? "Loading ..." : "Sign Up"} />
                                </View>
                            </View>
                        ) : (
                                <View>
                                    <View style={{ padding: 15 }}>
                                        <Button color={primary} onPress={this.signIn} title={this.state.loading ? "Loading ..." : "Sign In"} />
                                    </View>
                                </View>
                            )
                    }



                    <TouchableOpacity style={{ alignItems: 'flex-end', paddingRight: 15 }} onPress={this.toggleActiveView} activeOpacity={0.5}>
                        <Text>Or Sign {this.state.activeView === "signIn" ? "Up" : "In"} instead</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}