import React, {useEffect, useState, createRef} from "react";
import {Button, TextInput, View, Text, Alert} from "react-native"
import { useNavigation } from "@react-navigation/core";


const MenuAdmin = ({ route, navigation }) => {
    // Variable for data
    const nombreUser = route.params['nombreUser']   //User Name

    return (
        <View style={[{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,

        }]}>
            
            <Button 
              title="Crear Tarea" 
              
            />
            
            <Button
                title="Nuevo alumno"
                onPress={() =>
                    navigation.navigate("NuevoAlumno")
                }
               
            />

            <Button
                title="Nuevo profesor"
            />

            <Button
                title="Asignar Tarea"
            />


            
        </View> 
    )
}



export default MenuAdmin
