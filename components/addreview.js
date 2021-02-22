import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'
const badWordsFilter = require('./shared/profanityFilter')

class AddReview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      authToken: '',
      locationId: '',
      locationName: '',
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      cleanlinessRating: '',
      reviewBody: ''
    }
  }

  handleOverallRatingUpdate = (rating) => {
    this.setState({ overallRating: rating.toString() })
  }

  handlePriceRatingUpdate = (rating) => {
    this.setState({ priceRating: rating.toString() })
  }

  handleQualityRatingUpdate = (rating) => {
    this.setState({ qualityRating: rating.toString() })
  }

  handleCleanlinessRatingUpdate = (rating) => {
    this.setState({ cleanlinessRating: rating.toString() })
  }

  addReview = async () => {
    const state = this.state
    if (state.overallRating === '' || state.priceRating === '' || state.qualityRating === '' || state.cleanlinessRating === '' || state.reviewBody === '') {
      Alert.alert('Please make sure you complete all fields before trying to submit')
    } else {
      const cleanText = badWordsFilter(this.state.reviewBody)

      const authToken = await AsyncStorage.getItem('auth-token')

      const toSend = {
        overall_rating: Number(this.state.overallRating),
        price_rating: Number(this.state.priceRating),
        quality_rating: Number(this.state.qualityRating),
        clenliness_rating: Number(this.state.cleanlinessRating),
        review_body: cleanText
      }

      try {
        const response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.locationId + '/review', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
          },
          body: JSON.stringify(toSend)
        })

        // TODO: Look at swagger for all the different status codes and deal with each one
        if (response.status === 201) {
          Alert.alert('Successfully submitted your review, thank you')
          this.props.navigation.navigate('Home')
        } else if (response.status === 400) {
          Alert.alert('Bad request, please try again')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
        } else if (response.status === 404) {
          Alert.alert("There was a problem posting a review for this location, please go back and press 'Add review' again")
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
  }

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      const { locationName, locationId } = this.props.route.params
      this.setState({ locationName: locationName, locationId: locationId, reviewBody: '' })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>COFFIDA</Text>
        <Text style={styles.logo}>{this.state.locationName} - Add a review</Text>

        <View style={styles.centredText}>
          <Text style={styles.centredText}>Overall rating:</Text>
          <AirbnbRating
            defaultRating={0}
            count={5}
            reviewSize={25}
            showRating={false}
            onFinishRating={this.handleOverallRatingUpdate}
          />
        </View>

        <View style={styles.centredText}>
          <Text style={styles.centredText}>Price rating:</Text>
          <AirbnbRating
            defaultRating={0}
            count={5}
            reviewSize={25}
            showRating={false}
            onFinishRating={this.handlePriceRatingUpdate}
          />
        </View>

        <View style={styles.centredText}>
          <Text style={styles.centredText}>Quality rating:</Text>
          <AirbnbRating
            defaultRating={0}
            count={5}
            reviewSize={25}
            showRating={false}
            onFinishRating={this.handleQualityRatingUpdate}
          />
        </View>

        <View style={styles.centredText}>
          <Text style={styles.centredText}>Cleanliness rating:</Text>
          <AirbnbRating
            defaultRating={0}
            count={5}
            reviewSize={25}
            showRating={false}
            onFinishRating={this.handleCleanlinessRatingUpdate}
          />
        </View>

        <View style={styles.inputView}>

          <TextInput
            style={styles.inputText}
            placeholder='Enter your experience here'
            placeholderTextColor='#FFF'
            onChangeText={text => this.setState({ reviewBody: text })}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={() => this.addReview()}>
          <Text style={styles.loginText}>Add review</Text>
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
  }
})

export default AddReview
