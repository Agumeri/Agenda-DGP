import React from "react";
import {View, Text} from "react-native"
import Header from '../components/Header'
import Calendar from '../components/Calendar'

const MenuInicio = ({route}) => {
    const nombreUser = route.params['nombreUser']   //User Name

    return (
        <View>
            <Header nombreUser= {nombreUser}></Header>
            <Calendar nombreUser = {nombreUser}></Calendar>
        </View>
    )
}

export default MenuInicio