import 'react-native-gesture-handler'
import React from 'react'
import App from './src/navigators/login-navigator'
import { getLanguage } from './src/locales'

export default function CafeReviewApp () {
  getLanguage()
  return (
    <App />
  )
}
