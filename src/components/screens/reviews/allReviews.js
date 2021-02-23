import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, ActivityIndicator, Button, FlatList } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { get, post } from '../../../api'

class AllReviews extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: '',
      authToken: '',
      locationId: ''
    }
  }

  fetchReviews = async () => {
    const { locationId } = this.props.route.params

    this.setState({ locationId: locationId.toString() })

    try {
      const response = await get('location/' + locationId)

      if (response.status === 200) {
        const json = await response.json()

        this.setState({ locationData: json, isLoading: false })
      } else if (response.status === 404) {
        Alert.alert('There was a problem fetching the reviews for this location, please go back and try again')
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

  componentDidMount = async () => {
    this.props.navigation.addListener('focus', () => {
      this.fetchReviews()
    })
  }

  likeReview = async (reviewId) => {
    const toSend = {
      loc_id: Number(this.state.locationId),
      rev_id: reviewId
    }

    try {
      const response = await post('location/' + this.state.locationId + '/review/' + reviewId + '/like', JSON.stringify(toSend))

      if (response.status === 200) {
        Alert.alert('Successfully liked the review')

        this.fetchReviews()
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

  unlikeReview = async (reviewId) => {
    const authToken = await AsyncStorage.getItem('auth-token')

    const toSend = {
      loc_id: Number(this.state.locationId),
      rev_id: reviewId
    }

    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.locationId + '/review/' + reviewId + '/like', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': authToken
        },
        body: JSON.stringify(toSend)
      })

      // TODO: Look at swagger for all the different status codes and deal with each one
      if (response.status === 200) {
        Alert.alert('Successfully unliked the review')

        this.fetchReviews()
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

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size='large' color='#00ff00' />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>{this.state.locationData.location_name} reviews</Text>

          <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({ item }) => {
              return (
                <View style={styles.reviewBody}>
                  <AirbnbRating
                    defaultRating={item.review_overallrating}
                    count={5}
                    isDisabled
                    reviewSize={25}
                  />
                  <Text>"{item.review_body}"</Text>

                  <Text>Likes: {item.likes}</Text>

                  <Button
                    title='Like'
                    onPress={() => this.likeReview(item.review_id)}
                  />

                  <Button
                    title='Unlike'
                    onPress={() => this.unlikeReview(item.review_id)}
                  />
                </View>
              )
            }}
            keyExtractor={item => item.review_id.toString()}
          />
        </View>
      )
    }
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
  },
  reviewBody: {
    flex: 1,
    backgroundColor: '#668b8b',
    marginBottom: 10
  }
})

export default AllReviews
