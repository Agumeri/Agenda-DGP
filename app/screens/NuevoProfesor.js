import React, { useEffect, useState, createRef } from "react";
import { Button, TextInput, View, Text, Alert } from "react-native"
import { useNavigation } from "@react-navigation/core";
import { createProfesor } from "../api";

const NuevoProfesor = () => {
    // Variables to control data value
    const [userName, setUserName] = useState('') // User Data
    const [userEmail, setUserEmail] = useState('') // Email Data
    const [userPass, setUserPass] = useState('') // Pass Data
    const [userPass2, setUserPass2] = useState('') // Pass2 Data
    const passwordInputRef = createRef()

    const createProf = async () => {

        if (!userName || !userPass || !userEmail || !userPass2) {
            alert("Se ha dejado un campo vacío")
            return
        }

        if( userPass != userPass2){
            alert("Las contraseñas no coinciden")
            return
        }

   
        let dataToSend = { usuario: userName, contraseña: userPass, email: userEmail }
        const result = createProfesor(dataToSend['usuario'], dataToSend['contraseña'], dataToSend['email'])
 
    }

    return (
        <View style={[{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,

        }]}>
            <Text><b>Nombre de usuario: </b></Text>
            <TextInput style={[{ backgroundColor: "#ffff" }]}
                placeholder="Introduzca nombre de usuario "
                onChangeText={(userName) => setUserName(userName)}
            />
            <Text style={[{
                marginTop: 35
            }]}><b>Correo electrónico: </b></Text>

            <TextInput
                style={[{ marginBottom: 35, backgroundColor: "#ffff" }]}
                placeholder="Introduzca el correo electrónico"
                onChangeText={(userEmail) => setUserEmail(userEmail)}
            />

            <Text style={[{
                marginTop: 35
            }]}><b>Contraseña: </b></Text>

            <TextInput
                style={[{ marginBottom: 35, backgroundColor: "#ffff" }]}
                placeholder="Introduzca la contraseña"
                onChangeText={(userPass) => setUserPass(userPass)}
            />

            <Text style={[{
                marginTop: 35
            }]}><b>Repita Contraseña: </b></Text>

            <TextInput
                style={[{ marginBottom: 35, backgroundColor: "#ffff" }]}
                placeholder="Repita la contraseña"
                onChangeText={(userPass2) => setUserPass2(userPass2)}
            />



            <Button
                title="Registrar"
                onPress={() =>
                    createProf()
                }
            />
        </View>
    )
}



export default NuevoProfesor