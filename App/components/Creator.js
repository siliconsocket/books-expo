import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Snackbar, TextInput, Title } from "react-native-paper";

const BASE_URL = "http://192.168.1.68/api";

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
  },
});

export class Creator extends Component {
  state = {
    title: "",
    author: "",
    snackbar: null,
  };
  onInsert() {
    fetch(BASE_URL + "/addbook", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          title: "",
          author: ""
        });
        this.props.onSuccess()
      })
      .catch((error) => {
        console.error(error);
        this.props.onError()
      });
  }
  render() {
    const { title, author } = this.state;
    return (
      <>
        <Title style={{ textAlign: "center" }}>Registro de Libros</Title>
        <TextInput
          label="Título"
          mode="outlined"
          placeholder="Título del libro"
          name="title"
          value={title}
          style={styles.input}
          onChangeText={(title) => this.setState({ title })}
        ></TextInput>
        <TextInput
          label="Autor"
          mode="outlined"
          placeholder="Autor de libro"
          name="author"
          value={author}
          style={styles.input}
          onChangeText={(author) => this.setState({ author })}
        ></TextInput>
        <Button
          icon="content-save"
          mode="contained"
          style={styles.input}
          onPress={() => this.onInsert()}
        >
          Guardar
        </Button>
        {this.state.snackbar}
      </>
    );
  }
}

export default Creator;
