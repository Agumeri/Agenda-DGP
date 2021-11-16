import React, {useEffect, useState, createRef} from "react";
import {Button, TextInput, View, Text, Alert} from "react-native"
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
        <View>
            <Text>Usuario: </Text>
            <TextInput 
                placeholder="Usuario"
                onChangeText={(userEmail) => setUserEmail(userEmail)}
            />
            <Text style={[{
                marginTop: 35
            }]}>Clave:</Text>
            <TextInput 
                placeholder="Clave"
                onChangeText={(userPass) => setUserPass(userPass)}
            />
            <Button 
              title="Acceder" 
              onPress={() => 
                checkUser("usuario y contraseña")
              }
            />
        </View> 
    )
}



export default LoginScreen