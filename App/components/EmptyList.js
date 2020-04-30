import React, { Component } from 'react'

import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const styles = StyleSheet.create({
	warning: {
		backgroundColor: '#0497E2',
		padding: 15,
		margin: 10,
		borderRadius: 10
	}
})

export class EmptyList extends Component {
	render() {
		return (
			<View style={styles.warning}>
				<Text style={{ color: '#FFF' }}>{this.props.text}</Text>
			</View>
		)
	}
}