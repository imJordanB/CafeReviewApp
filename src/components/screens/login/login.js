import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, TextInput, View, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { post } from '../../../api'
import { baseStyles } from '../../../styles/styles'
import { t } from '../../../locales'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    }
  }

  login = async () => {
    if (this.state.email === '' || this.state.password === '') {
      Alert.alert('Please enter an email address and password before attempting to login')
    } else {
      const toSend = {
        email: this.state.email,
        password: this.state.password
      }

      try {
        const response = await post('user/login', JSON.stringify(toSend))

        if (response.status === 200) {
          const json = await response.json()

          await AsyncStorage.setItem('auth-token', json.token)
          await AsyncStorage.setItem('user-id', json.id.toString())

          this.props.navigation.navigate('Menu')
        } else if (response.status === 400) {
          Alert.alert('Incorrect login details, please check your details and try again')
        } else if (response.status === 500) {
          Alert.alert('Server error, please try again later')
        } else {
          Alert.alert('Something went wrong, please try again later')
        }
      } catch (error) {
        console.log(error)
        Alert.alert('Something went wrong, please try again later')
      }
    }
  };

  render () {
    const navigation = this.props.navigation

    return (
      <View style={baseStyles.container}>
        <Text style={baseStyles.logoText} ariaLabel='Coffida'>COFFIDA</Text>
        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder={t('email')}
            placeholderTextColor='#FFF'
            keyboardType='email-address'
            onChangeText={text => this.setState({ email: text })}
            ariaLabel='Enter your account email address'
            autoCorrect={false}
          />
        </View>

        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder={t('password')}
            placeholderTextColor='#FFF'
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            ariaLabel='Enter your account password'
          />
        </View>

        <TouchableOpacity ariaRole='button' style={baseStyles.confirmBtn} onPress={() => this.login()}>
          <Text style={baseStyles.confirmBtnText}>{t('login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity ariaRole='button' style={baseStyles.alternativeBtn} onPress={() => navigation.navigate('Signup')}>
          <Text style={baseStyles.confirmBtnText}>{t('signup')}</Text>
        </TouchableOpacity>
      </View>
    )
  };
}

export default Login
