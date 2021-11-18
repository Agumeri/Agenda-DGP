import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './screens/LoginScreen'
import MenuTareas from './screens/MenuTareas'
import MenuInicio from './screens/MenuInicio'
import MenuAdmin from './screens/MenuAdmin'
import NuevoAlumno from './screens/NuevoAlumno'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
          title: 'Iniciar Sesión'
        }}


        />
        <Stack.Screen name="MenuInicio" component={MenuInicio} options={{
          title: 'Agenda'
        }}
        />
        <Stack.Screen name="MenuTareas" component={MenuTareas} options={{
          title: 'Tareas'
        }}
        />

        <Stack.Screen name="MenuAdmin" component={MenuAdmin} options={{
          title: 'Menú Administrador'
        }}
        />

        <Stack.Screen name="NuevoAlumno" component={NuevoAlumno} options={{
          title: 'Crear Alumno'
        }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
