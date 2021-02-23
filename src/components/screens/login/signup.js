import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, TextInput, View, Alert, TouchableOpacity } from 'react-native'
import { baseStyles } from '../../../styles/styles'

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
  };

  render () {
    return (
      <View style={baseStyles.container}>
        <Text style={baseStyles.logoText}>COFFIDA</Text>
        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder='First name'
            placeholderTextColor='#FFF'
            onChangeText={text => this.setState({ firstName: text })}
            ariaLabel='First name'
          />
        </View>

        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder='Last name'
            placeholderTextColor='#FFF'
            onChangeText={text => this.setState({ lastName: text })}
            ariaLabel='Last name'
          />
        </View>
        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder='Email address'
            placeholderTextColor='#FFF'
            keyboardType='email-address'
            onChangeText={text => this.setState({ email: text })}
            ariaLabel='Email address'
          />
        </View>

        <View style={baseStyles.inputView}>
          <TextInput
            style={baseStyles.inputText}
            placeholder='Password'
            placeholderTextColor='#FFF'
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            ariaLabel='Password'
          />
        </View>

        <TouchableOpacity style={baseStyles.confirmBtn} ariaRole='button' onPress={() => this.signup()}>
          <Text style={baseStyles.confirmBtnText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    )
  };
}

export default Signup
