import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        const response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(toSend)
        })

        if (response.status === 200) {
          // Alert.alert("Login success. Auth Token: " +json['token']);

          const json = await response.json()

          await AsyncStorage.setItem('auth-token', json.token)
          await AsyncStorage.setItem('user-id', json.id.toString())

          this.fetchUserDetails()

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

  fetchUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('user-id')
      const authToken = await AsyncStorage.getItem('auth-token')

      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userId, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': authToken
        }
      })

      if (response.status === 200) {
        const json = await response.json()

        await AsyncStorage.setItem('first_name', json.first_name)
        await AsyncStorage.setItem('last_name', json.last_name)
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
      } else if (response.status === 404) {
        Alert.alert('User not found, please try signing up or logging in again')
      } else if (response.status === 500) {
        Alert.alert('There was a problem with the server, please try again later')
      } else {
        Alert.alert('Something went wrong, Please try again later')
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Something went wrong. Plase try again')
    }
  };

  render () {
    const navigation = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={styles.logo} ariaLabel='Coffida'>COFFIDA</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Email address'
            placeholderTextColor='#FFF'
            keyboardType='email-address'
            onChangeText={text => this.setState({ email: text })}
            ariaLabel='Enter your account email address'
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Password'
            placeholderTextColor='#FFF'
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            ariaLabel='Enter your account password'
          />
        </View>

        <TouchableOpacity ariaRole='button' style={styles.loginBtn} onPress={() => this.login()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity ariaRole='button' style={styles.signupBtn} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    height: 50,
    color: 'white'
  },
  loginText: {
    color: '#FFF'
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  signupBtn: {
    width: '80%',
    backgroundColor: '#AAA',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10
  }
})

export default Login
