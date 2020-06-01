import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  List,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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

  buttonValChange = (todo) => {
    this.setState((prevState) => {
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
    });
  };

  createTodo = (val) => {
    this.setState((currentState) => ({
      todos: [
        ...currentState.todos,
        { value: val, id: this.id++, checked: "", icon: false },
      ],
    }));
  };

  deleteItem = (val) => {
    this.setState((currentState) => ({
      todos: currentState.todos.filter((todo) => todo !== val),
    }));
  };

  submittionUpdate = (e) => {
    e.preventDefault();
    this.createTodo(this.state.inputText);
    this.setState({ inputText: "" });
  };

  render() {
    return (
      <>
        <TouchableWithoutFeedback>
          <SafeAreaView style={styles.container}>
            <Text style={styles.text}>rep🔥irs</Text>
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.textField}
                value={this.state.inputText}
                onChangeText={(text) => this.changingVal(text)}
                onSubmitEditing={this.submittionUpdate}
                placeholder={"Please enter the repair here..."}
              />
              <View>
                <ScrollView style={{ flex: 1 }}>
                  {this.state.todos.map((todo, i) => (
                    <>
                      <ListItem
                        key={this.id}
                        style={{
                          borderBottomColor: "black",
                          marginTop: 3,
                          height: 40,
                          flex: 1,
                        }}
                        linearGradientProps={{
                          colors: ["#ffe8e8", "#ffe8e8"],
                        }}
                        switch={{
                          value: todo.icon,
                          onValueChange: () => this.buttonValChange(todo),
                        }}
                        title={todo.value}
                        titleStyle={
                          todo.icon === true
                            ? {
                                textDecorationLine: "line-through",
                                color: "lightgrey",
                              }
                            : ""
                        }
                        rightIcon={{
                          name: "trash",
                          type: "font-awesome",
                          color: "#f50",
                          onPress: () => this.deleteItem(todo),
                        }}
                        bottomDivider
                      ></ListItem>
                    </>
                  ))}
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
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
    fontSize: 70,
    color: "#af2f2f59",
  },
  textField: {
    height: 40,
    borderWidth: 0.2,
    width: 300,
    marginTop: 30,
    borderColor: "black",
    paddingLeft: 7,
    borderRadius: 10,
  },
});
