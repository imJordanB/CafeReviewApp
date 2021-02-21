import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RNCamera } from 'react-native-camera'

class AddPhoto extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: '',
      authToken: '',
      locationId: '',
      reviewId: ''
    }
  }

  sendPhoto = async (data) => {
    const authToken = await AsyncStorage.getItem('auth-token')

    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.locationId + '/review/' + this.state.reviewId + '/photo', {
        method: 'post',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': authToken
        },
        body: data
      })

      // TODO: Look at swagger for all the different status codes and deal with each one
      if (response.status === 200) {
        Alert.alert('Successfully submitted your photo for your review, thank you')
        this.props.navigation.navigate('Home')
      } else if (response.status === 400) {
        Alert.alert('400')
      } else {
        Alert.alert('Server error, please try again later')
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Something went wrong. Plase try again')
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)

      this.sendPhoto(data)
    }
  }

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      const { locationId, reviewId } = this.props.route.params
      this.setState({ locationId: locationId, reviewId: reviewId })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>COFFIDA</Text>

        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          captureAudio={false}
        />

        <Button
          title='Take photo'
          onPress={() => { this.takePicture() }}
        />
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
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  reviewBody: {
    flex: 1,
    backgroundColor: '#668b8b',
    marginBottom: 10
  },
  centredText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

export default AddPhoto
