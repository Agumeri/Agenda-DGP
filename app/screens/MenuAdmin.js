import React, { useEffect, useState, createRef } from "react";
import { Button, TextInput, View, Text, Alert, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/core";


const MenuAdmin = ({ route, navigation }) => {
    // Variable for data
    const nombreUser = route.params['nombreUser']   //User Name

    return (
        <View style={styles.view}>

            <Button style={styles.button}
                title={<Text style={styles.text}>Crear Tarea</Text>}
                color= '#ffadad'
                accessibilityLabel='Crear una nueva tarea'

            />

            <Button style={styles.button}
                title={<Text style={styles.text}>Nuevo Alumno</Text>}
                color= '#fdffb6'
                accessibilityLabel='Crear un nuevo usuario alumno'
                onPress={() =>
                    navigation.navigate("NuevoAlumno")
                }

            />

            <Button style={styles.button}
                title={<Text style={styles.text}>Nuevo Profesor</Text>}
                color= '#9bf6ff'
                accessibilityLabel='Crear un nuevo usuario profesor'
                onPress={() =>
                    navigation.navigate("NuevoProfesor")
                }
            />


            <Button style={styles.button}
                title={<Text style={styles.text}>Asignar Tarea</Text>}
                color= '#caffbf'
                accessibilityLabel='Asignar una tarea existente a un alumno'
                onPress={() => navigation.navigate("AsignarTarea")}
            />

            <View style ={styles.separador}> </View>

            <Button style={styles.button}
                title={<Text style={styles.text}>Inventario</Text>}
                color= '#ffd6a5'
                accessibilityLabel='Hacer el inventario de materiales del colegio'
                onPress={() => navigation.navigate("Inventario")}
            />

            <Button style={styles.button}
                title={<Text style={styles.text}>Menu</Text>}
                color= '#ffc6ff'
                accessibilityLabel='Seleccionar la clase para recuento de menú'
                onPress={() => navigation.navigate("Clases")}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ffff",
    },
    text: {
        textTransform: 'uppercase',
        fontFamily: 'Escolar2',
        fontSize: 24,
        color: 'black',

    },
    view: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        marginVertical: '15%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    separador:{
        paddingTop: 20
    }
});


export default MenuAdmin
