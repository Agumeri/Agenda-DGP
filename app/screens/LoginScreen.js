import React, { useEffect, useState, createRef } from "react";
import { TextInput, View, Text, StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/core";
import { checkLogin, getPermisosUsuario } from "../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import {Button} from "react-native-elements";

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
                    /*
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
                }*/

            }
            else {
                alert("Se ha equivocado introduciendo algun campo")
            }
        })
    }

    return (
        <View style={styles.view}>
            <View style={styles.usrpsswd}>
                <Icon
			    name="user"
			    color = "black"
			    size={30}
		        />
                <Text style={styles.text}>Correo electrónico:</Text>
            </View>
            <TextInput style={styles.input}
                placeholder="INTRODUZCA SU CORREO ELECTRÓNICO"
                onChangeText={(user) => setUser(user)}
            />

            <View style={styles.usrpsswd}>
                <Icon
			    name="lock"
			    color = "black"
			    size={30}
		        />
                <Text style={styles.text}>Contraseña: </Text>
            </View>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder= 'INTRODUZCA SU CONTRASEÑA'
                onChangeText={(userPass) => setUserPass(userPass)}
            />
            <Button
                title={<Text style={styles.text}>Acceder</Text>}
                icon = {<Icon1
			                name="door-open"
			                color = "white"
			                size={30}
		                />}
                onPress={() =>
                    checkUser("usuario y contraseña")
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        textTransform: 'uppercase',
        backgroundColor: "#ffff",
        marginBottom: 35,
        fontFamily: 'Escolar2', 
        fontSize: 24,
    },
    text: {
        textTransform: 'uppercase',
        fontFamily: 'Escolar2', 
        fontSize: 24,
        paddingLeft: 10,
    },
    view: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    usrpsswd: {
        flexDirection: 'row',
        paddingLeft: 20,
    }
  });


export default LoginScreen