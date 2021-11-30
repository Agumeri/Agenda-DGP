import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font';

import LoginScreen from './screens/LoginScreen'
import MenuTareas from './screens/MenuTareas'
import MenuInicio from './screens/MenuInicio'
import MenuAdmin from './screens/MenuAdmin'
import NuevoAlumno from './screens/NuevoAlumno'
import NuevoProfesor from './screens/NuevoProfesor';
import InfoTarea from './screens/InfoTarea'
import AsignarTarea from './screens/AsignarTarea';
import AlumLoginScreen from './screens/AlumLoginScreen';
import Clases from './screens/Clases';
import Menus from './screens/Menus';
import Inventario from './screens/Inventario';
import { View } from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  });


  const loadFonts = async () => {
    await Font.loadAsync({
      'Escolar1': require('./assets/fonts/Escolar1.TTF'),
      'Escolar2': require('./assets/fonts/Escolar2Negra.TTF'),
    });

    setFontsLoaded(true);
  }

  if (!fontsLoaded) {
    return (<View />);
  }



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AlumLoginScreen" component={AlumLoginScreen} options={{
          title: 'Iniciar Sesión',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
          title: 'Iniciar Sesión',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />
        <Stack.Screen name="MenuInicio" component={MenuInicio} options={{
          title: 'Agenda',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />
        <Stack.Screen name="MenuTareas" component={MenuTareas} options={{
          title: 'Tareas',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="MenuAdmin" component={MenuAdmin} options={{
          title: 'Menú Administrador',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="NuevoAlumno" component={NuevoAlumno} options={{
          title: 'Crear Alumno',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="NuevoProfesor" component={NuevoProfesor} options={{
          title: 'Crear Profesor',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="InfoTarea" component={InfoTarea} options={{
          title: 'Informacion sobre la tarea',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="AsignarTarea" component={AsignarTarea} options={{
          title: 'Asignar la tarea a alumno',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="Clases" component={Clases} options={{
          title: 'Clases del colegio',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="Menus" component={Menus} options={{
          title: 'Recuento de menús',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />

        <Stack.Screen name="Inventario" component={Inventario} options={{
          title: 'Recuento del inventario',
          headerTitleStyle: {
            fontFamily: 'Escolar2',
            textTransform: 'uppercase'
          }
        }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
