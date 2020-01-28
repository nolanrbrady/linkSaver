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
        return this.state.links.map((link, i) => {
            return (
                <View style={{ height: 70, borderWidth: 1, borderColor: 'lightgrey', width }}>
                    <TouchableOpacity key={i} onPress={() => {}}>
                        <Text style={{ color: 'lightblue'}}>{link}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    onSuccess = (res) => {
        Alert.alert(JSON.stringify(res.data));
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'dark-content'}/>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    topViewStyle={{ flex: 1, backgroundColor: 'darkgrey' }}
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
});

export default App;
