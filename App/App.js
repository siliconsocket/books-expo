import React, { Component } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Divider, Snackbar, Title } from "react-native-paper";

import { Creator } from "./components/Creator";
import { Editor } from "./components/Editor";
import { BooksList } from "./containers/BooksList";

const BASE_URL = "http://192.168.1.68/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default class App extends Component {
  state = {
    bookId: null,
    books: [],
    refreshing: false,
    snackbar: null,
  };
  getAllBooks() {
    fetch(BASE_URL + "/books")
      .then((response) => response.json())
      .then((json) => {
        console.log(json, typeof json);
          this.setState({
            books: typeof json === "object" ? json : [],
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  onAdded() {
    this.setState({
      snackbar: this.msg("Libro agregado con éxito"),
    });
    this.getAllBooks();
  }
  onUpdated() {
    this.setState({
      bookId: null,
      snackbar: this.msg("Libro actualizado con éxito"),
    });
    this.getAllBooks();
  }
  onRemoved() {
    this.setState({
      bookId: null,
      snackbar: this.msg("El libro se ha eliminado"),
    });
    this.getAllBooks();
  }
  onError() {
    this.setState({
      snackbar: this.msg("Error al agregar el libro"),
    });
  }
  msg(text) {
    return (
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
        {text}
      </Snackbar>
    );
  }
  componentDidMount() {
    this.getAllBooks();
  }
  doDelete(id) {
    var data = "id=" + id;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    const self = this;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        self.onRemoved();
      }
    });

    xhr.open("DELETE", BASE_URL + "/deletebook");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
  }
  onRemove(id) {
    Alert.alert("Confirmación", "¿Desea eliminar este libro?", [
      { text: "Aceptar", onPress: () => this.doDelete(id) },
      { text: "Cancelar" },
    ]);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 21 }}>
          {this.state.bookId ? (
            <Editor
              bookId={this.state.bookId}
              onSuccess={() => this.onUpdated()}
              onCancel={() =>
                this.setState({
                  bookId: null,
                  snackbar: this.msg("Cancelado por el usuario"),
                })
              }
            />
          ) : (
            <Creator
              onSuccess={() => this.onAdded()}
              onError={() => this.onError()}
            />
          )}

          <Divider style={{ marginTop: 21 }} />

          {!this.state.bookId && (
            <>
              <Title>Libros Registrados</Title>

              <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 21 }}>
                <BooksList
                  books={this.state.books}
                  onEdit={(bookId) => this.setState({ bookId })}
                  onRemove={(bookId) => this.onRemove(bookId)}
                />
              </ScrollView>
            </>
          )}
          {this.state.snackbar}
        </View>
      </SafeAreaView>
    );
  }
}
