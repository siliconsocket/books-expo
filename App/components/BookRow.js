import Icon from '@expo/vector-icons/FontAwesome5'
import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { Text } from 'react-native-paper'

const styles = new StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  cell: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 14,
    paddingBottom: 14,
  },
  actions: {
    flex: 0.8,
    flexDirection: "row",
    alignItems: "center",
  },
});

export class BookRow extends Component {
  render() {
    const { title = "", author = "" } = this.props;
    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text numberOfLines={2}>{title}</Text>
        </View>
        <View style={styles.cell}>
          <Text numberOfLines={2}>{author}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableHighlight
            style={{ flex: 1 }}
            onPress={this.props.onEdit}
            underlayColor={"#FFF"}
          >
            <Icon name="edit" color={"#203723"} />
          </TouchableHighlight>
          <TouchableHighlight
            style={{ flex: 1 }}
            onPress={this.props.onRemove}
            underlayColor={"#FFF"}
          >
            <Icon name="trash" color={"#FF0000"} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default BookRow;
