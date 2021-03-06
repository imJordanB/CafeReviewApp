import 'react-native-gesture-handler'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ChangeDetails, SignOut } from '../components/screens/sidebar'
import NearbyCafesNav from './nearbyCafes-navigator'
import HomeNav from './home-navigator'
import ReviewManagementNav from './reviewManagement-navigator'
import FavouriteLocationsNav from './favouriteLocations-navigator'
import { t } from '../locales'

const Drawer = createDrawerNavigator()

export default function SidebarNav () {
  return (
    <Drawer.Navigator screenOptions={() => ({ headerShown: true })}>
      <Drawer.Screen name={t('home')} component={HomeNav} />
      <Drawer.Screen name={t('nearby-cafes')} component={NearbyCafesNav} />
      <Drawer.Screen name={t('favourite-cafes')} component={FavouriteLocationsNav} />
      <Drawer.Screen name={t('my-reviews')} component={ReviewManagementNav} />
      <Drawer.Screen name={t('change-details')} component={ChangeDetails} />
      <Drawer.Screen name={t('sign-out')} component={SignOut} />
    </Drawer.Navigator>
  )
}
