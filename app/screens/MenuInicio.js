import React from "react";
import {View, Text} from "react-native"
import Header from '../components/Header'
import Calendar from '../components/Calendar'

const MenuInicio = () => {
    return (
        <View>
            <Header></Header>
            <Calendar></Calendar>
        </View>
    )
}

export default MenuInicio