import React, {useEffect, useState, createRef} from "react";
import {Button, TextInput, View, Text, Alert} from "react-native"
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
        <View style={[{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,

        }]}>
            <Text><b>Nombre de usuario: </b></Text>
            <TextInput style={[{backgroundColor: "#ffff"}]}
                placeholder="Introduzca nombre de usuario "
                onChangeText={(userName) => setUsername(userName)}
            />
            <Text style={[{
                marginTop: 35
            }]}><b>Correo electrónico: </b></Text>

            <TextInput 
                style={[{ marginBottom: 35, backgroundColor: "#ffff"}]}
                placeholder="Introduzca el correo electrónico"
                onChangeText={(userEmail) => setUserEmail(userEmail)}
            />

            <Text style={[{
                marginTop: 35
            }]}><b>Correo electrónico del profesor: </b></Text>

            <TextInput 
                style={[{ marginBottom: 35, backgroundColor: "#ffff"}]}
                placeholder="Introduzca el correo electrónico del profesor"
                onChangeText={(teacherEmail) => setTeacherEmail(teacherEmail)}
            />

            <Text style={[{
                marginTop: 35
            }]}><b>Contraseña: </b></Text>

            <TextInput 
                style={[{ marginBottom: 35, backgroundColor: "#ffff"}]}
                placeholder="Introduzca la contraseña"
                onChangeText={(userPass) => setUserPass(userPass)}
            />

            <Text style={[{
                marginTop: 35
            }]}><b>Repita Contraseña: </b></Text>

            <TextInput 
                style={[{ marginBottom: 35, backgroundColor: "#ffff"}]}
                placeholder="Repita la contraseña"
                onChangeText={(userPass2) => setUserPass2(userPass2)}
            />



            <Button 
              title="Registrar" 
              onPress={() =>
                createAlum()
            }
            />
        </View> 
    )
}



export default NuevoAlumno