import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, ActivityIndicator, Button, FlatList, Image } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'

class ReviewManagement extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userReviews: [],
      firstName: '',
      authToken: '',
      locationId: ''
    }
  }

  fetchUserReviews = async () => {
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

        this.setState({ userReviews: json, isLoading: false })
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
      } else if (response.status === 404) {
        Alert.alert('User not found, please try signing out and logging in again')
      } else if (response.status === 500) {
        Alert.alert('There was a problem with the server, please try again later')
      } else {
        Alert.alert('Something went wrong, Please try again later')
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Something went wrong, Please try again later')
    }
  }

  deleteUserReview = async (locationId, reviewId) => {
    try {
      const authToken = await AsyncStorage.getItem('auth-token')

      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/review/' + reviewId, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': authToken
        }
      })

      if (response.status === 200) {
        Alert.alert('Successfully deleted review')
        this.setState({ isLoading: true })
        this.fetchUserReviews()
      } else if (response.status === 400) {
        Alert.alert('Bad request, please try again')
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
      } else if (response.status === 403) {
        Alert.alert('Forbidden, please try again later')
      } else if (response.status === 404) {
        Alert.alert('There was a problem finding this review, please try again later')
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

  deletePhoto = async (locationId, reviewId) => {
    this.setState({ isLoading: true })

    try {
      const authToken = await AsyncStorage.getItem('auth-token')

      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/review/' + reviewId + '/photo', {
        method: 'delete',
        headers: {
          'X-Authorization': authToken
        }
      })

      if (response.status === 200) {
        Alert.alert('Successfully deleted photo')
        this.fetchUserReviews()
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
      } else if (response.status === 403) {
        Alert.alert('Forbidden, please try again later')
      } else if (response.status === 404) {
        Alert.alert('There was a problem finding the photo, please try again later')
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
      this.fetchUserReviews()
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
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>COFFIDA</Text>
          <Text style={styles.logo}>My reviews</Text>

          <FlatList
            data={this.state.userReviews.reviews}
            renderItem={({ item }) => {
              const imageSize = 200
              const photoUri = 'http://10.0.2.2:3333/api/1.0.0/location/' + item.location.location_id + '/review/' + item.review.review_id + '/photo?timestamp=' + Date.now()
              return (
                <View style={styles.reviewBody}>
                  <Text>{item.location.location_name}</Text>
                  <AirbnbRating
                    defaultRating={item.review.overall_rating}
                    count={5}
                    isDisabled
                    reviewSize={25}
                  />

                  <Image
                    source={{ uri: photoUri }}
                    style={{ width: imageSize, height: imageSize }}
                  />

                  <Text>"{item.review.review_body}"</Text>

                  <Text>Likes: {item.review.likes}</Text>

                  <Button
                    title='Add photo'
                    onPress={() => this.props.navigation.navigate('Add photo', { locationId: item.location.location_id, reviewId: item.review.review_id })}
                  />

                  <Button
                    title='View photo'
                    onPress={() => this.props.navigation.navigate('View photo', { locationId: item.location.location_id, reviewId: item.review.review_id })}
                  />

                  <Button
                    title='Remove photo'
                    onPress={() => this.deletePhoto(item.location.location_id, item.review.review_id)}
                  />

                  <Button
                    title='Edit review'
                    onPress={() => this.props.navigation.navigate('Edit review', { review: item.review, locationId: item.location.location_id })}
                  />

                  <Button
                    title='Delete review'
                    onPress={() => this.deleteUserReview(item.location.location_id, item.review.review_id)}
                  />
                </View>
              )
            }}
            keyExtractor={item => item.review.review_id.toString()}
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

export default ReviewManagement
