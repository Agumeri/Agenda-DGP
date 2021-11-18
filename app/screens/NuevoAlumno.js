import React, {useEffect, useState, createRef} from "react";
import {Button, TextInput, View, Text, Alert} from "react-native"
import { useNavigation } from "@react-navigation/core";

const NuevoAlumno = () => {
    // Variables to control data value
    const [username, setUsername] = useState('') // User Data
    const [userEmail, setUserEmail] = useState('') // Email Data
    const [userPass, setUserPass] = useState('') // Pass Data
    const [user2, setUserPass2] = useState('') // Pass2 Data
    var result = "Failure"
    const passwordInputRef = createRef()

   

    return (
        <View style={[{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,

        }]}>
            <Text><b>Nombre de usuario: </b></Text>
            <TextInput style={[{backgroundColor: "#ffff"}]}
                placeholder="Introduzca nombre de usuario "
                onChangeText={(username) => setUsername(username)}
            />
            <Text style={[{
                marginTop: 35
            }]}><b>Correo electrónico: </b></Text>

            <TextInput 
                style={[{ marginBottom: 35, backgroundColor: "#ffff"}]}
                placeholder="Introduzca el correo electrónico"
                onChangeText={(userEmail) => setUserPass(userEmail)}
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
                onChangeText={(userPass2) => setUserPass(userPass2)}
            />



            <Button 
              title="Registrar" 
              
            />
        </View> 
    )
}



export default NuevoAlumno