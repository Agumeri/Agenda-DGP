import React, { useEffect, useState, createRef } from "react";
import { Button, TextInput, View, Text, Alert, StyleSheet } from "react-native"
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
        <View style={styles.view}>
            <Text style={styles.text}>Nombre de usuario:</Text>
            <TextInput style={styles.input}
                placeholder="INTRODUZCA NOMBRE DE USUARIO "
                onChangeText={(userName) => setUserName(userName)}
            />
            <Text style={styles.text}>Correo electrónico:</Text>

            <TextInput
                style={styles.input}
                placeholder="INTRODUZCA EL CORREO ELECTRÓNICO"
                onChangeText={(userEmail) => setUserEmail(userEmail)}
            />

            <Text style={styles.text}>Contraseña:</Text>

            <TextInput
                style={styles.input}
                placeholder="INTRODUZCA LA CONTRASEÑA"
                onChangeText={(userPass) => setUserPass(userPass)}
            />

            <Text style={styles.text}>Repita Contraseña:</Text>

            <TextInput
                style={styles.input}
                placeholder="REPITA LA CONTRASEÑA"
                onChangeText={(userPass2) => setUserPass2(userPass2)}
            />



            <Button
                title={<Text style={styles.text}>Registrar</Text>}
                onPress={() =>
                    createProf()
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#ffff",
        marginBottom: 35,
        fontFamily: 'Escolar2', 
        fontSize: 24
    },
    text: {
        textTransform: 'uppercase',
        fontFamily: 'Escolar2', 
        fontSize: 24,
        
    },
    view: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    }
  });

export default NuevoProfesor