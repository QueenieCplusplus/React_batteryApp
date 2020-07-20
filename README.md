# React_batteryApp

# CodeFile

    import * as React from 'react';
    // expo install expo-battery
    import * as Battery from 'expo-battery';
    import {Text, View } from 'react-native';

    export default class App extends React.Component {
      state = {
        batteryLevel: null,
      };

      componentDidMount() {
        this.subscribe();
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      async subscribe() {

        const batteryLevel = await Battery.getBatteryLevelAsync();
        this.setState({ batteryLevel });

        this.subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
        
          this.setState({ batteryLevel });
          
          //console.log('batteryLevel changed!', batteryLevel);
          
        });

      }

      unsubscribe() {

        this.subscription && this.subscription.remove();
        this.subscription = null;

      }

      render() {
        return (
          <View>
            <Text>Current Battery Level: {this.state.batteryLevel}</Text>
          </View>
        );
      }
    }

