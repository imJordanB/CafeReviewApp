import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, TextInput, View, Alert, TouchableOpacity } from 'react-native'
import { baseStyles } from '../../../styles/styles'
import { t } from '../../../locales'

class Signup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  signup () {
    if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '') {
      Alert.alert('Please make sure all fields are completed')
    } else {
      const toSend = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }

      return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toSend)
      })
        .then((response) => {
          if (response.status === 201) {
            Alert.alert('Signup success')
            this.props.navigation.navigate('Login')
          } else if (response.status === 400) {
            Alert.alert('Bad request, please make sure you entered a valid email and your password is greater than 5 characters.')
          } else if (response.status === 500) {
            Alert.alert('There was a problem with the server, please try again later')
          } else {
            Alert.alert('Something went wrong, please try again later')
          }
        })
        .catch((error) => {
          console.log(error)
          Alert.alert('Something went wrong, please try again later')
        })
    }
  };

  render () {
    return (
      <View style={baseStyles.container}>
        <Text style={baseStyles.logoText}>COFFIDA</Text>
        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder={t('first-name')}
            placeholderTextColor='#FFF'
            onChangeText={text => this.setState({ firstName: text })}
            ariaLabel={t('first-name')}
          />
        </View>

        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder={t('last-name')}
            placeholderTextColor='#FFF'
            onChangeText={text => this.setState({ lastName: text })}
            ariaLabel={t('last-name')}
          />
        </View>
        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder={t('email')}
            placeholderTextColor='#FFF'
            keyboardType='email-address'
            onChangeText={text => this.setState({ email: text })}
            ariaLabel={t('email')}
          />
        </View>

        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder={t('password')}
            placeholderTextColor='#FFF'
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            ariaLabel={t('password')}
          />
        </View>

        <TouchableOpacity style={baseStyles.confirmBtn} ariaRole='button' onPress={() => this.signup()}>
          <Text style={baseStyles.confirmBtnText}>{t('signup')}</Text>
        </TouchableOpacity>
      </View>
    )
  };
}

export default Signup
