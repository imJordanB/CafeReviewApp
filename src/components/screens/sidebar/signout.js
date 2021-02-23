import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, Alert, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { post } from '../../../api'

class SignOut extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  signOut = async () => {
    try {
      const response = await post('user/logout')

      if (response.status === 200) {
        Alert.alert('Successfully logged out')

        await AsyncStorage.multiRemove(['user-id', 'auth-token'])

        this.props.navigation.navigate('Login')
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please restart the application')
      } else if (response.status === 500) {
        Alert.alert('There was a problem with the server, please try again later')
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Something went wrong. Plase try again')
    }
  };

  componentDidMount () {
    this.signOut()
  }

  render () {
    return (
      <View>
        <ActivityIndicator size='large' color='#00ff00' />
        <Text>Signing out...</Text>
      </View>
    )
  };
}

export default SignOut
