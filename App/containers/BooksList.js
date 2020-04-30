import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Subheading } from "react-native-paper";

import { BookRow } from "../components/BookRow";
import { EmptyList } from "../components/EmptyList";

const styles = new StyleSheet.create({
  title: {
    fontWeight: "bold",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
});

export class BooksList extends Component {
  state = {}
  render() {
    const { books = [] } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Subheading style={styles.title}>Título</Subheading>
          <Subheading style={styles.title}>Autor</Subheading>
          <Subheading style={styles.title}></Subheading>
        </View>
        {books.length > 0 ? (
          books.map((book) => {
            return (
              <BookRow
                key={"book-" + book.id}
                title={book.title}
                author={book.author}
                onRemove={() => this.props.onRemove(book.id)}
                onEdit={() => this.props.onEdit(book.id)}
              />
            );
          })
        ) : (
          <EmptyList text="Aún no hay libros registrados"></EmptyList>
        )}
      </View>
    );
  }
}

export default BooksList;
