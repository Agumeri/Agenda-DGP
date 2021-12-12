import React, { useEffect, useState, createRef } from "react";
import { TextInput, View, Text, StyleSheet, Alert, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/core";
import { checkLogin, getPermisosUsuario, getListaAlumnos } from "../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import {Button} from "react-native-elements";

const AlumLoginScreen = () => {
    // Variables to control data value
    const [user, setUser] = useState('') // Email Data
    const [userPass, setUserPass] = useState('')  // Pass Data
    const [alumList, setAlumList] = useState([]);
    const [loading, setLoading] = useState(false) //Load data
    const navigation = useNavigation() //Navigate option
    var result = "Failure"
    var firstTime = true;
    const passwordInputRef = createRef()

    // Obtenemos la lista de alumnos
    useEffect(() => {
        result = getListaAlumnos()        
        
        result.then( response =>  response.json().then( data => ({
                data: data,
                status: response.status
        })))
        .then( res => {
            console.log(res)
            if(res.status == 200) {
                setAlumList(res.data)
            } else {
                console.log("No hay alumnos")
            }
        })
        firstTime = false;
    },[])

    const checkUser = async (user,pass) => {

        // if (!user || !userPass) {
        //     alert("Se ha dejado un campo vacio")
        //     return
        // }

        setLoading(true)
        let dataToSend = { usuario: user, contraseña: pass }
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
                            console.log("Iniciando sesión como " + user);;
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
            }
            else {
                alert("Se ha equivocado introduciendo algun campo")
            }
        })
    }

    return (
        <View>
            <View style={styles.head}>
		        <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("LoginScreen", {nombreUser: user})}
                >
                <Text style={styles.text}>Acceder a login</Text>
                </TouchableOpacity>
	        </View>


            <View style={styles.view}>
                {/* Tareas de Hoy*/}
                <View style={styles.taskWrapper}>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    {
                        alumList.map((alumno) => {
                            console.log("../images/userImg/default.jpg");
                            return( 
                                <View key={alumno.id_usuario} style={styles.taskContainer}>
                                    <TouchableOpacity onPress={() => checkUser(alumno.correo_electronico,alumno.contraseña)}>
                                        <View>
                                            <Image 
                                                style={styles.pictograma} 
                                                source = {require("../images/userImg/" + alumno.imagen)}
                                            
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.text}> {alumno.nombre_usuario} </Text>
                                </View>
                            )})
                    }
                    </View> 
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textTransform: 'uppercase',
        fontFamily: 'Escolar2', 
        fontSize: 24,
        paddingLeft: 10,
        alignItems: 'center',
    },
    pictograma : {
		width: 300,
		height: 300,
        backgroundColor :'#FFFFFF',
        marginTop: 30,
        marginBottom: 30,
        borderRadius: '100%',
        borderColor: '#06d6a0',
        borderWidth: 3,
        borderStyle: 'solid',
	},
    view: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        alignItems: 'center',
    },
    usrpsswd: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    taskContainer: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
		height: 50,
        backgroundColor :'#06d6a0',
    },
    head: {
        width: 300,
		height: 50,
    }
  });


export default AlumLoginScreen