import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AddReview, AllReviews } from '../components/screens/reviews'
import { FavouriteLocations } from '../components/screens/sidebar'
import { t } from '../locales'

const Stack = createStackNavigator()

export default function FavouriteLocationsNav () {
  return (
    <Stack.Navigator>
      <Stack.Screen name={t('favourite-cafes')} component={FavouriteLocations} options={() => ({ headerShown: false })} />
      <Stack.Screen name={t('add-review')} component={AddReview} />
      <Stack.Screen name={t('all-reviews')} component={AllReviews} />
    </Stack.Navigator>
  )
}
