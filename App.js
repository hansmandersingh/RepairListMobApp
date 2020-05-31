import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  List,
} from "react-native";

import { ListItem, CheckBox } from "react-native-elements";

export default class App extends React.Component {
  id = 0;

  state = {
    inputText: "",
    todos: [],
  };

  changingVal = (text) => {
    this.setState({ inputText: text });
  };

  buttonValChange =(todo) => {
    this.setState(prevState => {
      let existingTodoIndex = prevState.todos.findIndex(
        (element) => element === todo
      );
      let clonedTodo = { ...prevState.todos[existingTodoIndex] };
      if (clonedTodo.icon === true) {
        clonedTodo.icon = false;
      } else if (clonedTodo.icon !== true) {
        clonedTodo.icon = true;
      }

      let newState = [...prevState.todos];

      newState.splice(existingTodoIndex, 1, clonedTodo);

      return { todos: newState };
    })
  }

  createTodo = (val) => {
    this.setState((currentState) => ({
      todos: [
        ...currentState.todos,
        { value: val, id: this.id++, checked: "", icon: false },
      ],
    }));
  };

  submittionUpdate = (e) => {
    e.preventDefault();
    this.createTodo(this.state.inputText);
    console.log(this.state.todos);
    this.setState({ inputText: "" });
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <Text style={styles.text}>rep🔥irs</Text>
          <View>
            <TextInput
              style={styles.textField}
              value={this.state.inputText}
              onChangeText={(text) => this.changingVal(text)}
              onSubmitEditing={this.submittionUpdate}
            />
            {this.state.todos.map((todo) => (
              <>
                
                <ListItem
                  switch={{value: todo.icon, onValueChange: () => this.buttonValChange(todo)}}
                  key={todo.id}
                  title={todo.value}
                  titleStyle={todo.icon === true ? {textDecorationLine: "line-through", color: "lightgrey"} : ""}
                  bottomDivider
                ></ListItem>
              </>
            ))}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#ffe8e8",
  },
  text: {
    fontSize: 50,
    color: "#af2f2f59",
  },
  textField: {
    flex: 0.2,
    borderWidth: 0.2,
    width: 300,
    marginTop: 30,
    borderColor: "black",
  },
});
