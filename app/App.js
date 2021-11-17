import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import LoginScreen from './screens/LoginScreen'
import MenuTareas from './screens/MenuTareas'
import MenuInicio from './screens/MenuInicio'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="LoginScreen" component={LoginScreen} options={{
          title: 'Iniciar Sesión'
        }}
        
        
        />
        <Stack.Screen name ="MenuInicio" component={MenuInicio} options={{
            title: 'Agenda'
        }}
        />
        <Stack.Screen name ="MenuTareas" component={MenuTareas} options={{
            title: 'Tareas'
        }}
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
