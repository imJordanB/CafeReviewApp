import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Login, Signup } from '../components/screens/login'
import SidebarNav from '../navigators/sidebar-navigator'

const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={() => ({ headerShown: false })} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Menu' component={SidebarNav} options={() => ({ headerShown: false })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
