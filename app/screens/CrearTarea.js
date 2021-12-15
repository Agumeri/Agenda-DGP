import React, { useState, createRef } from 'react'
import { Button, View, TextInput, Text, StyleSheet, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { crearIdTarea, createPaso, createTareaFija } from "../api";

const CrearTarea = ({ route, navigation }) => {

    let refInput = createRef()
    const [paso, setPaso] = useState(1)
    const [descrip, setDescrip] = useState("")
    const [height, setHeight] = useState(250)
    const [width, setWidth] = useState(250)
    const [uri, setUri] = useState('https://via.placeholder.com/250')
    const [inicio, setInicio] = useState(true)
    const [idTarea, setIdTarea] = useState('')
    const [nombre, setNombre] = useState('')

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setUri(result.uri);
            setHeight(result.height);
            setWidth(result.width)
        }
        else {
            alert('No se ha seleccionado una imagen')
        }
    };

    const getIdTarea = async () => {
        const result = crearIdTarea()

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                    setIdTarea(res.data.id_tarea)
                } else {
                    console.log("No se ha podido crear el id")
                }
            })
    };

    const insertPaso = async () => {
        const resp = createPaso(idTarea, paso, descrip, uri);
    };

    const insertTareaFija = async () => {
        const resp = createTareaFija(idTarea, nombre, idTarea)
    };

    const outputButton = () => {
        if (inicio) {
            return (<Text style={styles.text}>Añadir pictogramas</Text>)
        } else {
            return (<Text style={styles.text}>Siguiente</Text>)
        }
    };
    const output = () => {
        if (inicio) {
            return (

                <View styles={styles.container}>
                    <View style ={styles.separador}> </View>
                    <Text style={styles.text}>Nombre de la tarea:</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="inserte nombre de la tarea"
                        multiline={true}
                        onChangeText={(nombre) => setNombre(nombre)}
                    />

                </View>
            )
        }

        else {
            return (
                <View style={styles.container}>
                    <View style ={styles.separador}> </View>
                    <Text style={styles.sectionTitle}>Paso: {paso}</Text>
                    <Text style={styles.text}>Descripción del paso:</Text>

                    <TextInput
                        style={styles.descripInput}
                        placeholder="DESCRIPCIÓN DE LA TAREA"
                        multiline={true}
                        ref={refInput}
                        onChangeText={(descrip) => setDescrip(descrip)}
                    />

                    <Button
                        title={<Text style={styles.text}>Seleccionar imagen</Text>}
                        color= '#ff99c8'
                        accessibilityLabel='Seleccionar imagen'
                        onPress={selectImage}
                    />

                    <Image
                        style={{
                            height: 250, width: (250 * width) / height, backgroundColor: '#FFFFFF', marginTop: 10,
                            marginBottom: 10,
                            borderColor: '#ff99c8',
                            borderWidth: 3,
                            borderStyle: 'solid',
                        }}
                        source={{ uri: uri }}
                    />
                </View>
            )
        }

    };

    const finalizar = () => {
        if (!inicio) {
            return(<Button
                title={<Text style={styles.text}>Finalizar tarea</Text>}
                color= '#ff99c8'
                accessibilityLabel='Finalizar la tarea'
                onPress={() => {
                    {
                        insertTareaFija()
                        alert("Tarea guardada correctamente")
                        setDescrip("")
                        setPaso(1)
                        setUri('https://via.placeholder.com/300')

                        navigation.navigate("MenuAdmin", {
                            nombreUser: route.params['nombreUser']
                        })
                        }
                    }
                }
                
            />)
        }
    }

    return (
        <View style={styles.container}>

            {output()}

            <Button
                title={outputButton()}
                color= '#ff99c8'
                onPress={() => {
                    {
                        if (inicio) { 
                            setInicio(false) 
                            getIdTarea()
                        }
                        else {
                            insertPaso()
                            refInput.current.clear()
                            setPaso(paso + 1)
                            setUri('https://via.placeholder.com/250')
                        }
                    }
                }
                }
            />
            <View style ={styles.separador}> </View>
            {finalizar()}
            <View style ={styles.separador}> </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },

    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
    },
    descripInput: {
        backgroundColor: "#ffff",
        marginBottom: 10,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        fontSize: 22,
        //width: '80%',
        height: 55,
        textAlignVertical: "top",
    },
    input: {
        backgroundColor: "#ffff",
        marginBottom: 35,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        fontSize: 22,
        height: 60
    },
    item: {
        marginTop: 30,
        fontSize: 24,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',

    },
    text: {
        fontSize: 24,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        marginTop: 7,
        color: 'black',
    },
    pictograma: {
        width: 250,
        height: 250,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,

    },
    separador:{
        paddingTop: 10
    }
    

})

export default CrearTarea
