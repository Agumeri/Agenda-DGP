import React, { useEffect, useState, createRef } from "react";
import { Button, TextInput, View, Text, Alert } from "react-native"
import { useNavigation } from "@react-navigation/core";
import { checkLogin, getPermisosUsuario } from "../api";

const LoginScreen = () => {
    // Variables to control data value
    const [user, setUser] = useState('') // Email Data
    const [userPass, setUserPass] = useState('') // Pass Data
    const [loading, setLoading] = useState(false) //Load data
    const navigation = useNavigation() //Navigate option
    var result = "Failure"
    const passwordInputRef = createRef()

    const checkUser = async (loginData) => {

        if (!user || !userPass) {
            alert("Se ha dejado un campo vacio")
            return
        }

        setLoading(true)
        let dataToSend = { usuario: user, contraseña: userPass }
        result = checkLogin(dataToSend['usuario'], dataToSend['contraseña'])
        setLoading(false)
        result.then((succes) => {
            if (succes.ok === true) {
                // Miramos que permiso tiene el usuario para ver a que menu tiene que redirigirse
                const perm = getPermisosUsuario(dataToSend['usuario'])
                perm.then(response => response.json().then(data => ({
                    data: data,
                    status: response.status
                })))
                    .then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            if (res.data.permisos == 0) {
                                navigation.navigate("MenuAdmin", {
                                    nombreUser: user
                                })
                            }
                            else if (res.data.permisos == 1) {
                                navigation.navigate("MenuAdmin", {
                                    nombreUser: user
                                })
                            }
                            else {
                                navigation.navigate("MenuTareas", {
                                    nombreUser: user
                                })
                            }
                        } else {
                            console.log("Permiso erroneo")
                        }
                    })
                if (perm == 0) {
                    navigation.navigate("MenuAdmin", {
                        nombreUser: user
                    })
                }
                else if (perm == 1) {
                    navigation.navigate("MenuAdmin", {
                        nombreUser: user
                    })
                }
                else {
                    navigation.navigate("MenuTareas", {
                        nombreUser: user
                    })
                }

            }
            else {
                alert("Se ha equivocado introduciendo algun campo")
            }
        })
    }

    return (
        <View style={[{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,

        }]}>
            <Text>Correo electrónico:</Text>
            <TextInput style={[{ backgroundColor: "#ffff" }]}
                placeholder="Introduzca su correo electronico"
                onChangeText={(user) => setUser(user)}
            />
            <Text style={[{
                marginTop: 35
            }]}>Contraseña: </Text>
            <TextInput
                style={[{ marginBottom: 35, backgroundColor: "#ffff" }]}
                placeholder="Introduzca su contraseña"
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