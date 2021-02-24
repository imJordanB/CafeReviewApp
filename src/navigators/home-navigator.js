import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../components/screens/home'
import { AllReviews, AddReview } from '../components/screens/reviews'
import { t } from '../locales'

const Stack = createStackNavigator()

export default function HomeNav () {
  return (
    <Stack.Navigator>
      <Stack.Screen name={t('home')} component={Home} options={() => ({ headerShown: false })} />
      <Stack.Screen name={t('add-review')} component={AddReview} />
      <Stack.Screen name={t('all-reviews')} component={AllReviews} />
    </Stack.Navigator>
  )
}
