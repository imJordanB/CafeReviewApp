import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class SignOut extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  signOut = async () => {
    const authToken = await AsyncStorage.getItem('auth-token')

    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': authToken
        }
      })

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
        <Text>Signing out...</Text>
      </View>
    )
  };
}

export default SignOut
