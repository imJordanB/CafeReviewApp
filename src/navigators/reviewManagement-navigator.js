import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditReview, AddPhoto } from '../components/screens/reviews'
import { ReviewManagement } from '../components/screens/sidebar'
import { t } from '../locales'

const Stack = createStackNavigator()

export default function ReviewManagementNav () {
  return (
    <Stack.Navigator>
      <Stack.Screen name={t('my-reviews')} component={ReviewManagement} options={() => ({ headerShown: false })} />
      <Stack.Screen name={t('edit-review')} component={EditReview} />
      <Stack.Screen name={t('add-photo')} component={AddPhoto} />
    </Stack.Navigator>
  )
}
