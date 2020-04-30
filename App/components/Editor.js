import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Snackbar, TextInput, Title } from "react-native-paper";

const BASE_URL = "http://192.168.1.68/api";

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
});

export class Editor extends Component {
  state = {
    title: "",
    author: "",
  };
  onUpdate() {
    console.log(this.state);
    fetch(BASE_URL + "/updatebook", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.bookId,
        title: this.state.title,
        author: this.state.author,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          title: "",
          author: "",
          snackbar: (
            <Snackbar
              visible={true}
              onDismiss={() => {
                this.setState({ snackbar: null });
              }}
              action={{
                label: "OK",
                onPress: () => {
                  this.setState({ snackbar: null });
                },
              }}
            >
              Se actualizó el libro exitosamente
            </Snackbar>
          ),
        });
        this.props.onSuccess();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getBookInfo() {
    const bookId = this.props.bookId;
    fetch(BASE_URL + "/bookbyid?id=" + bookId)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, typeof json);
        if (typeof json === "object") {
          const book = json[0];
          if (book) {
            this.setState({
              title: book.title,
              author: book.author,
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getBookInfo();
  }
  render() {
    const { title, author } = this.state;
    return (
      <>
        <Title style={{ textAlign: "center" }}>Editar libro</Title>
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
          onPress={() => this.onUpdate()}
        >
          Actualizar
        </Button>
        <Button mode="text" style={styles.input} onPress={this.props.onCancel}>
          Cancelar
        </Button>
        {this.state.snackbar}
      </>
    );
  }
}

export default Editor;
