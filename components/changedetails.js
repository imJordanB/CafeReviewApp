import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class ChangeDetails extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  changeDetails = async () => {
    if (this.state.firstName === '' && this.state.lastName === '' && this.state.email === '' && this.state.password === '') {
      Alert.alert('No changes, please enter details for the fields you wish to change')
    } else {
      const toSend = {
        first_name: this.state.firstName === '' ? undefined : this.state.firstName,
        last_name: this.state.lastName === '' ? undefined : this.state.lastName,
        email: this.state.email === '' ? undefined : this.state.email,
        password: this.state.password === '' ? undefined : this.state.password
      }

      const userId = await AsyncStorage.getItem('user-id')
      const authToken = await AsyncStorage.getItem('auth-token')

      try {
        const response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userId, {
          method: 'patch',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
          },
          body: JSON.stringify(toSend)
        })

        // TODO: Look at swagger for all the different status codes and deal with each one
        if (response.status === 200) {
          Alert.alert('Success')

          this.props.navigation.navigate('Home')
        } else if (response.status === 400) {
          Alert.alert('Bad request, please make sure you have entered valid information into the fields')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
        } else if (response.status === 403) {
          Alert.alert("It seems you're trying to update someone else's details, please report this error if it continues")
        } else if (response.status === 404) {
          Alert.alert('User not found, maybe the account was deleted, try logging out and back in, and try again')
        } else if (response.status === 500) {
          Alert.alert('There was a problem with the server, please try again later')
        } else {
          Alert.alert('Something went wrong, please try again later')
        }
      } catch (error) {
        console.log(error)
        Alert.alert('Something went wrong. Plase try again')
      }
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>COFFIDA</Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='First name (optional)'
            placeholderTextColor='#FFF'
            onChangeText={text => this.setState({ firstName: text })}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Last name (optional)'
            placeholderTextColor='#FFF'
            onChangeText={text => this.setState({ lastName: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Email address (optional)'
            placeholderTextColor='#FFF'
            onChangeText={text => this.setState({ email: text })}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Password (optional)'
            placeholderTextColor='#FFF'
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={() => this.changeDetails()}>
          <Text style={styles.loginText}>Change details</Text>
        </TouchableOpacity>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'

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

export default ChangeDetails
