import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { Button, TouchableOpacity } from "react-native"
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
		<TouchableOpacity onPress={() =>
                    navigation.navigate("MenuInicio", {nombreUser: props.nombreUser})
        }>
		<Icon
			name="home"
			color = "black"
			size={60}
		/>
		</TouchableOpacity>
		<Image style={styles.botonResumen} source={require('../images/resumen.png')}/>
		<TouchableOpacity>
		<Icon1
			name="help-outline"
			color = "black"
			size={60}
		/>
		</TouchableOpacity>
	</View>
	)
}

const styles = StyleSheet.create({
	container : {
		flexDirection: 'row',
		height: 80,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 15
	},
	botonResumen : {
		width: 60,
		height: 60
	}
})

export default Header