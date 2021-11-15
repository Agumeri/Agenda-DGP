import React, {useEffect, useState} from "react";
import {Button, TextInput, View, Text, Alert} from "react-native"
import { useNavigation } from "@react-navigation/core";
import { checkLogin } from "../api";

const LoginScreen = () => {
    const checkUser = async (loginData) => {
        console.log(loginData);
        // usuario y contraseña se obtendrían de userdata entiendo, pero no se acceder a el
        const data = checkLogin("email","contraseña"); 
        data.then( (result) => {
            console.log(result);
            if(result.ok === true){
                navigation.navigate("MenuInicio")
            } else {
                // Poner un alert diciendo que falla user o passwd
            }
        });
    }

    const navigation = useNavigation();

    const [data, setData] = React.useState({
        usuario: '',
        clave: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    
    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    


    return (
        <View>
            <Text>Usuario: </Text>
          <TextInput 
                    placeholder="Usuario"
                    onChangeText={(val) => textInputChange(val)}
                />
            <Text style={[{
                marginTop: 35
            }]}>Clave:</Text>
            <TextInput 
                    placeholder="Clave"
                    onChangeText={(val) => textInputChange(val)}
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