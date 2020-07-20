import * as React from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View } from 'react-native';

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

    this._subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      this.setState({ batteryLevel });
      console.log('batteryLevel changed!', batteryLevel);
    });

  }

  unsubscribe() {

    this._subscription && this._subscription.remove();
    this._subscription = null;

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Current Battery Level: {this.state.batteryLevel}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#777777',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
