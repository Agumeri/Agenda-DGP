import React, {useEffect, useState, createRef} from "react";
import {Button, TextInput, View, Text, Alert, StyleSheet} from "react-native"
import { useNavigation } from "@react-navigation/core";
import { checkLogin } from "../api";

const LoginScreen = () => {
    // Variables to control data value
    const [userEmail, setUserEmail] = useState('') // Email Data
    const [userPass, setUserPass] = useState('') // Pass Data
    const [loading, setLoading] = useState(false) //Load data
    const navigation = useNavigation() //Navigate option
    var result = "Failure"
    const passwordInputRef = createRef()

    const checkUser = async (loginData) => {

        if(!userEmail || !userPass) {
            alert("Se ha dejado un campo vacio")
            return
        }

        setLoading(true)
        let dataToSend = {usuario: userEmail, contraseña: userPass}
        result = checkLogin(dataToSend['usuario'], dataToSend['contraseña'])
        setLoading(false)
        result.then( (succes) => {
            if(succes.ok === true) {
                navigation.navigate("MenuTareas")
            }
            else {
                alert("Se ha equivocado introduciendo algun campo")
            }
        })
    }

    return (
        <View style={styles.container}>
            {/* Today Task*/}
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Tareas de Hoy</Text>
                <View style={styles.item}>
                    {/**Aqui es donde van las tareas */}
                </View>
            </View>

        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper:{
        paddingTop:80,
        paddingHorizontal: 20,
    },
    sectionTitle:{
        fontSize: 24,
        fontWeight:'bold'
    },
    item:{}
})

export default LoginScreen