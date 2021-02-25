import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AllReviews } from '../components/screens/reviews'
import { NearbyCafes } from '../components/screens/sidebar'

const Stack = createStackNavigator()

export default function NearbyCafesNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Nearby cafes' component={NearbyCafes} options={() => ({ headerShown: false })} />
      <Stack.Screen name='Reviews' component={AllReviews} />
    </Stack.Navigator>
  )
}
