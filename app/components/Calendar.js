import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialIcons'

import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native'


const Calendar = props => (
	<View>
		<View style={styles.container}>
			<TouchableWithoutFeedback>
				<View style={styles.lunes}>
					<Text style={styles.dias}>Lunes</Text>
				</View>
			</TouchableWithoutFeedback>

			<TouchableWithoutFeedback>
				<View style={styles.martes}>
					<Text style={styles.dias}>Martes</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
		<View style={styles.container}>
			<TouchableWithoutFeedback>
				<View style={styles.miercoles}>
					<Text style={styles.dias}>Miercoles</Text>
				</View>
			</TouchableWithoutFeedback>

			<TouchableWithoutFeedback>
				<View style={styles.jueves}>
					<Text style={styles.dias}>Jueves</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
		<View style={styles.container}>
			<TouchableWithoutFeedback>
				<View style={styles.viernes}>
					<Text style={styles.dias}>Viernes</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	</View>

)

const styles = StyleSheet.create({
	container : {
		flexDirection: 'row',
		height: 200,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 20
	},
	lunes : {
		width: '49%',
		height: '90%',
		backgroundColor: "#ffadad",
		alignItems: 'center',
		borderRadius: 10
	},
	martes : {
		width: '49%',
		height: '90%',
		backgroundColor: '#bdb2ff',
		alignItems: 'center',
		borderRadius: 10
	},
	miercoles : {
		width: '49%',
		height: '90%',
		backgroundColor: '#a0c4ff',
		alignItems: 'center',
		borderRadius: 10
	},
	jueves : {
		width: '49%',
		height: '90%',
		backgroundColor: '#ffd6a5',
		alignItems: 'center',
		borderRadius: 10
	},
	viernes : {
		width: '49%',
		height: '90%',
		backgroundColor: '#95d5b2',
		alignItems: 'center',
		borderRadius: 10
	},
	dias : {
		fontSize: 30
	}
})

export default Calendar