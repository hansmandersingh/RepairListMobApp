import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  id = 0;

  state = {
    inputText: "",
    todos: []
  }

  print = () => {
   console.log('works');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Gandu  Sallaa</Text>
        <Button title="click me" onPress={this.print}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
