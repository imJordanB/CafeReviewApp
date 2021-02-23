import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { View, StyleSheet, Alert, Button } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { post } from '../../../api'
import { baseStyles, colorPalette } from '../../../styles/styles'

class AddPhoto extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      authToken: '',
      locationId: '',
      reviewId: ''
    }
  }

  sendPhoto = async (data) => {
    try {
      const response = await post('location/' + this.state.locationId + '/review/' + this.state.reviewId + '/photo', data, 'image/jpeg')

      if (response.status === 200) {
        Alert.alert('Successfully submitted your photo for your review, thank you')
        this.props.navigation.navigate('Home')
      } else if (response.status === 400) {
        Alert.alert('Bad request, please try again')
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
      } else if (response.status === 404) {
        Alert.alert("There was a problem finding the review, please go back and press 'Add photo' again")
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
      <View style={baseStyles.mainContainer}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          captureAudio={false}
        />

        <Button
          title='Take photo'
          color={colorPalette.darkPrimary}
          onPress={() => { this.takePicture() }}
        />
      </View>
    )
  };
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

export default AddPhoto
