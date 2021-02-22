import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../components/screens/home'
import { AllReviews, AddReview, EditReview, AddPhoto, ViewPhoto } from '../components/screens/reviews'

const Stack = createStackNavigator()

export default function HomeNav () {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={() => ({ headerShown: false })} />
      <Stack.Screen name='Add review' component={AddReview} />
      <Stack.Screen name='Edit review' component={EditReview} />
      <Stack.Screen name='All Reviews' component={AllReviews} />
      <Stack.Screen name='Add photo' component={AddPhoto} />
      <Stack.Screen name='View photo' component={ViewPhoto} />
    </Stack.Navigator>
  )
}
