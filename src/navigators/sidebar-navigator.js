import 'react-native-gesture-handler'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { ChangeDetails, SignOut, ReviewManagement } from '../components/screens/sidebar'
import HomeNav from './home-navigator'

const Drawer = createDrawerNavigator()

export default function SidebarNav () {
  return (
    <Drawer.Navigator screenOptions={() => ({ headerShown: true })}>
      <Drawer.Screen name='Home' component={HomeNav} />
      <Drawer.Screen name='My reviews' component={ReviewManagement} />
      <Drawer.Screen name='Change details' component={ChangeDetails} />
      <Drawer.Screen name='Sign out' component={SignOut} />
    </Drawer.Navigator>
  )
}
