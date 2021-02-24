import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../components/screens/home'
import { AllReviews, AddReview, EditReview, AddPhoto, ViewPhoto } from '../components/screens/reviews'
import { t } from '../locales'

const Stack = createStackNavigator()

export default function HomeNav () {
  return (
    <Stack.Navigator>
      <Stack.Screen name={t('home')} component={Home} options={() => ({ headerShown: false })} />
      <Stack.Screen name={t('add-review')} component={AddReview} />
      <Stack.Screen name={t('edit-review')} component={EditReview} />
      <Stack.Screen name={t('all-reviews')} component={AllReviews} />
      <Stack.Screen name={t('add-photo')} component={AddPhoto} />
      <Stack.Screen name={t('view-photo')} component={ViewPhoto} />
    </Stack.Navigator>
  )
}
