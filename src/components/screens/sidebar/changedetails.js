import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, TextInput, View, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
import { patch, get } from '../../../api'
import { getUserId } from '../../../utilities/async-storage'
import { baseStyles } from '../../../styles/styles'
import { t } from '../../../locales'

class ChangeDetails extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      customerInfo: [],
      currentFirstName: '',
      currentLastName: '',
      currentEmail: ''
    }
  }

  changeDetails = async () => {
    if (this.state.firstName === '' && this.state.lastName === '' && this.state.email === '' && this.state.password === '') {
      Alert.alert('No changes, please enter details for the fields you wish to change')
    } else {
      const userId = await getUserId()

      const toSend = {
        first_name: this.state.firstName === '' ? undefined : this.state.firstName,
        last_name: this.state.lastName === '' ? undefined : this.state.lastName,
        email: this.state.email === '' ? undefined : this.state.email,
        password: this.state.password === '' ? undefined : this.state.password
      }

      try {
        const response = await patch('user/' + userId, JSON.stringify(toSend))

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

  fetchCurrentInfo = async () => {
    try {
      const userId = await getUserId()

      const response = await get('user/' + userId)

      if (response.status === 200) {
        const json = await response.json()

        this.setState({ customerInfo: json, isLoading: false })
      } else if (response.status === 400) {
        Alert.alert('Bad request, please try again later')
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
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

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      this.setState({ isLoading: true })
      this.fetchCurrentInfo()
    })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size='large' color='#00ff00' />
        </View>
      )
    } else {
      const customerInfo = this.state.customerInfo
      return (
        <View style={baseStyles.container}>
          <Text style={baseStyles.logoText}>{t('change-details')}</Text>
          <Text style={baseStyles.text}>Current information:</Text>
          <Text style={baseStyles.text}>Name: {customerInfo.first_name} {customerInfo.last_name}</Text>
          <Text style={baseStyles.text}>Email: {customerInfo.email}</Text>
          <View style={baseStyles.inputView}>
            <TextInput
              style={baseStyles.inputText}
              placeholder={t('first-name') + ' (' + t('optional') + ')'}
              placeholderTextColor='#FFF'
              onChangeText={text => this.setState({ firstName: text })}
            />
          </View>

          <View style={baseStyles.inputView}>
            <TextInput
              style={baseStyles.inputText}
              placeholder={t('last-name') + ' (' + t('optional') + ')'}
              placeholderTextColor='#FFF'
              onChangeText={text => this.setState({ lastName: text })}
            />
          </View>
          <View style={baseStyles.inputView}>
            <TextInput
              style={baseStyles.inputText}
              placeholder={t('email') + ' (' + t('optional') + ')'}
              placeholderTextColor='#FFF'
              onChangeText={text => this.setState({ email: text })}
            />
          </View>

          <View style={baseStyles.inputView}>
            <TextInput
              style={baseStyles.inputText}
              placeholder={t('password') + ' (' + t('optional') + ')'}
              placeholderTextColor='#FFF'
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
            />
          </View>

          <TouchableOpacity ariaRole='button' style={baseStyles.confirmBtn} onPress={() => this.changeDetails()}>
            <Text style={baseStyles.confirmBtnText}>{t('confirm-change')}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  };
}

export default ChangeDetails
