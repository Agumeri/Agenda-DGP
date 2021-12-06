import React, {useEffect, useState, createRef} from "react";
import {Button, TextInput, View, Text, Alert, StyleSheet} from "react-native"
import { useNavigation } from "@react-navigation/core";
import { createAlumno, getPermisosUsuario } from "../api";

const NuevoAlumno = () => {
    // Variables to control data value
    const [userName, setUsername] = useState('') // User Data
    const [userEmail, setUserEmail] = useState('') // Email Data
    const [teacherEmail, setTeacherEmail] = useState('') // Teacher Email Data
    const [userPass, setUserPass] = useState('') // Pass Data
    const [userPass2, setUserPass2] = useState('') // Pass2 Data
    var result = "Failure"
    const passwordInputRef = createRef()

    const createAlum = async () => {

        if (!userName || !userPass || !teacherEmail || !userEmail || !userPass2) {
            alert("Se ha dejado un campo vacío")
            return
        }

        if( userPass != userPass2){
            alert("Las contraseñas no coinciden")
            return
        }
   
        let dataToSend = { usuario: userName, contraseña: userPass, email: userEmail, email_profesor: teacherEmail }
        const result = createAlumno(dataToSend['usuario'], dataToSend['contraseña'], dataToSend['email'], dataToSend['email_profesor'])
    }

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Nombre de usuario:</Text>
            <TextInput style={styles.input}
                placeholder="INTRODUZCA NOMBRE DE USUARIO "
                onChangeText={(userName) => setUsername(userName)}
            />
            <Text style={styles.text}>Correo electrónico:</Text>

            <TextInput 
                style={styles.input}
                placeholder="INTRODUZCA EL CORREO ELECTRÓNICO"
                onChangeText={(userEmail) => setUserEmail(userEmail)}
            />

            <Text style={styles.text}>Correo electrónico del profesor:</Text>

            <TextInput 
                style={styles.input}
                placeholder="INTRODUZCA EL CORREO ELECTRÓNICO DEL PROFESOR"
                onChangeText={(teacherEmail) => setTeacherEmail(teacherEmail)}
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
              title={<Text style={styles.text}>Registrar </Text>}
              color= '#fdffb6'
              onPress={() =>
                createAlum()
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
        color: 'black',        
    },
    view: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    }
  });

export default NuevoAlumno