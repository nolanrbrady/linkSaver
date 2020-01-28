/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import FlipCard from 'react-native-flip-card';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
    SafeAreaView,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    View,
    Dimensions,
    Text,
    StatusBar,
    Linking,
} from 'react-native';

const { width, height } = Dimensions.get('window');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            test: 'This is a test from state - Face',
            other: 'this is a test from back - Back',
            links: [
                'https://www.google.com',
                'https://github.com/react-native-community/react-native-permissions',
                'https://reactjs.org/',
            ]
        }
    }

    renderLinks = () => {
        const { links } = this.state;
        if (!links.length) return;
        return links.map((link, i) => {
            return (
                <View style={styles.linkContainer}>
                    <TouchableOpacity key={i} onPress={() => {
                        Linking.openURL(link).catch((err) => console.error('An error occurred', err));
                    }}>
                        <Text style={{ color: '#0A84FF', fontSize: 15 }}>{link}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    onSuccess = (res) => {
        if (res.data) {
            Alert.alert(
                'Link Found',
                `Do you want to save this link? \n ${res.data}`,
                [
                    { text: 'Yes', onPress: () => {
                        this.setState({ links: [res.data, ...this.state.links]});
                        Alert.alert(
                            'Link Saved',
                            'Would you like to scan another?',
                            [
                                {text: 'Yes', onPress: () => this.scanner.reactivate()},
                                {text: 'No', onPress: () => {}}
                            ]
                        )
                    }},
                    {text: 'Scan Another One', onPress: () => this.scanner.reactivate()},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        } else {
            Alert.alert(
                'Sorry',
                'We weren\'t able to find a URL associated with this QR Code. \n Would you like to try again?',
                [
                    {text: 'Yes', onPress: () => this.scanner.reactivate()},
                    {text: 'No', onPress: () => {}}
                ]
            );
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'dark-content'}/>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    ref={(node) => { this.scanner = node }}
                    topViewStyle={{ flex: 1, backgroundColor: '#f2f2f2' }}
                    bottomViewStyle={{ flex: 4 }}
                    cameraStyle={{ height: height * 0.4 }}
                    topContent={
                        <Text style={styles.title}>
                            SCAN A QR CODE
                        </Text>
                    }
                    bottomContent={
                        <ScrollView>
                            {this.renderLinks()}
                        </ScrollView>
                    }
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    heightcenterText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    title: {
        fontWeight: '300',
        color: '#000',
        letterSpacing: 2,
        fontSize: 22,
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    linkContainer: {
        height: 70,
        borderWidth: 1,
        borderColor:  'transparent',
        borderBottomColor: 'lightgrey',
        width,
        justifyContent: 'center',
        paddingLeft: 10
    }
});

export default App;
