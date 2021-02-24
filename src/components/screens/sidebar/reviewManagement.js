import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, Alert, ActivityIndicator, Button, FlatList, Image } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { get, deleteEndpoint } from '../../../api'
import { getUserId } from '../../../utilities/async-storage'
import { baseStyles, homeStyles, colorPalette } from '../../../styles/styles'
import { t } from '../../../locales'

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
      const userId = await getUserId()

      const response = await get('user/' + userId)

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
      const response = await deleteEndpoint('location/' + locationId + '/review/' + reviewId)

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
      const response = await deleteEndpoint('location/' + locationId + '/review/' + reviewId + '/photo')

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
      this.setState({ isLoading: true })
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
        <View style={baseStyles.mainContainer}>
          <View style={homeStyles.heading}>
            <Text style={baseStyles.logoText}>My reviews</Text>
          </View>

          <FlatList
            data={this.state.userReviews.reviews}
            renderItem={({ item }) => {
              const imageSize = 200
              const photoUri = 'http://10.0.2.2:3333/api/1.0.0/location/' + item.location.location_id + '/review/' + item.review.review_id + '/photo?timestamp=' + Date.now()
              return (
                <View style={homeStyles.cafeShopRow}>
                  <View style={homeStyles.cafeNameContainer}>
                    <Text style={homeStyles.cafeName}>{item.location.location_name}</Text>
                  </View>

                  <View style={homeStyles.halfWidth}>
                    <AirbnbRating
                      defaultRating={item.review.overall_rating}
                      count={5}
                      isDisabled
                      size={20}
                    />

                    <Image
                      source={{ uri: photoUri }}
                      style={{ width: imageSize, height: imageSize }}
                    />

                    <Text style={homeStyles.reviewBody}>"{item.review.review_body}"</Text>

                    <Text style={homeStyles.reviewBody}>{t('likes')}: {item.review.likes}</Text>

                    <View style={homeStyles.fixToText}>
                      <Button
                        title={t('add-photo')}
                        color={colorPalette.lightSecondary}
                        onPress={() => this.props.navigation.navigate(t('add-photo'), { locationId: item.location.location_id, reviewId: item.review.review_id })}
                      />

                      <Button
                        title={t('remove-photo')}
                        color={colorPalette.lightSecondary}
                        onPress={() => this.deletePhoto(item.location.location_id, item.review.review_id)}
                      />
                    </View>

                    <View style={homeStyles.fixToText}>
                      <Button
                        title={t('edit-review')}
                        color={colorPalette.lightSecondary}
                        onPress={() => this.props.navigation.navigate(t('edit-review'), { review: item.review, locationId: item.location.location_id })}
                      />

                      <Button
                        title={t('delete-review')}
                        color={colorPalette.lightSecondary}
                        onPress={() => this.deleteUserReview(item.location.location_id, item.review.review_id)}
                      />
                    </View>
                  </View>
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

export default ReviewManagement
