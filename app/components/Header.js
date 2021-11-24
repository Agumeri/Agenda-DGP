import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { Button } from "react-native"
import { useNavigation } from "@react-navigation/core";

import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native'



const Header = (props) => {
	
	const navigation = useNavigation()

	return(
	<View style={styles.container}>
		<TouchableWithoutFeedback onPress={() =>
                    navigation.navigate("MenuInicio", {nombreUser: props.nombreUser})
        }>
		<Icon
			name="home"
			color = "black"
			size={100}
		/>
		</TouchableWithoutFeedback>
		<Image style={styles.botonResumen} source={require('../images/resumen.png')}/>
		<TouchableWithoutFeedback>
		<Icon1
			name="help-outline"
			color = "black"
			size={100}
		/>
		</TouchableWithoutFeedback>
	</View>
	)
}

const styles = StyleSheet.create({
	container : {
		flexDirection: 'row',
		height: 120,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 15
	},
	botonResumen : {
		width: 100,
		height: 100
	}
})

export default Header