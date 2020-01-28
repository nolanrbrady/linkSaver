/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import FlipCard from 'react-native-flip-card';
import {
  SafeAreaView,
  StyleSheet,
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
            other: 'this is a test from back - Back'
        }
    }
    render(){
        return (
                <FlipCard
                    flipHorizontal={true}
                    style={styles.container}>
                    <StatusBar barStyle={'dark-content'}/>
                    <View>
                        <Text>{this.state.test}</Text>
                    </View>
                    <View>
                        <Text>{this.state.other}</Text>
                    </View>
                </FlipCard>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    }
});

export default App;
