import React, { useState, createRef } from 'react'
import { Button, View, TextInput, Text, StyleSheet, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { crearIdTarea, createPaso, createTareaFija } from "../api";

const CrearTarea = ({ route, navigation }) => {

    let refInput = createRef()
    const [paso, setPaso] = useState(1)
    const [descrip, setDescrip] = useState("")
    const [height, setHeight] = useState(300)
    const [width, setWidth] = useState(300)
    const [uri, setUri] = useState('https://via.placeholder.com/300')
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
                //console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                    setIdTarea(res.data)
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
                    <Text style={styles.text}>Nombre de la tarea:</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="inserte nombre de la tarea"
                        onChangeText={(nombre) => setNombre(nombre)}
                    />

                </View>
            )
        }

        else {
            return (
                <View style={styles.container}>
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
                        onPress={selectImage}
                    />

                    <Image
                        style={{
                            height: 300, width: (300 * width) / height, backgroundColor: '#FFFFFF', marginTop: 30,
                            marginBottom: 30
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
                title={<Text style={styles.text}>finalizar tarea</Text>}
                onPress={() => {
                    {
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
                onPress={() => {
                    {
                        if (inicio) { setInicio(false) }
                        else {
                            insertPaso()
                            refInput.current.clear()
                            setPaso(paso + 1)
                            setUri('https://via.placeholder.com/300')
                        }
                    }
                }
                }
            />

            {finalizar()}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        textAlign: 'center',
        alignItems: 'center',
    },

    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
    },
    descripInput: {
        backgroundColor: "#ffff",
        marginBottom: 35,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        fontSize: 24,
        width: '80%',
        height: '20%',
        textAlignVertical: "top",
    },
    input: {
        backgroundColor: "#ffff",
        marginBottom: 35,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        fontSize: 24,
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
    },
    pictograma: {
        width: 300,
        height: 300,
        backgroundColor: '#FFFFFF',
        marginTop: 30,
        marginBottom: 30,

    },
    

})

export default CrearTarea
