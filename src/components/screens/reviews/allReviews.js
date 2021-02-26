import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, Alert, ActivityIndicator, Button, FlatList, Image } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { get, post, deleteEndpoint } from '../../../api'
import { baseStyles, homeStyles, colorPalette } from '../../../styles/styles'
import { t } from '../../../locales'

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
      this.setState({ isLoading: true })
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
        Alert.alert('Bad request, please try again later')
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

  unlikeReview = async (reviewId) => {
    try {
      const response = await deleteEndpoint('location/' + this.state.locationId + '/review/' + reviewId + '/like')

      if (response.status === 200) {
        Alert.alert('Successfully unliked the review')

        this.fetchReviews()
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
      } else if (response.status === 403) {
        Alert.alert('Forbidden, please try again later')
      } else if (response.status === 404) {
        Alert.alert("There was a problem posting a review for this location, please go back and press 'Add review' again")
      } else if (response.status === 500) {
        Alert.alert('Server error, please try again later')
      } else {
        Alert.alert('Server error, please try again later')
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Something went wrong, please try again later')
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
        <View style={baseStyles.mainContainer}>
          <View style={homeStyles.heading}>
            <Text style={baseStyles.logoText}>{this.state.locationData.location_name}</Text>
          </View>

          <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({ item }) => {
              const photoUri = 'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.locationId + '/review/' + item.review_id + '/photo?timestamp=' + Date.now()
              return (
                <View style={homeStyles.cafeShopRow}>
                  <AirbnbRating
                    defaultRating={item.overall_rating}
                    count={5}
                    isDisabled
                    size={20}
                  />

                  <Image
                    source={{ uri: photoUri }}
                    style={{ width: 200, height: 200 }}
                    accessibilityLabel={'User submitted photo for ' + this.state.locationData.location_name}
                  />

                  <Text style={homeStyles.reviewBody}>"{item.review_body}"</Text>

                  <Text style={homeStyles.reviewBody}>Price: {item.price_rating}/5</Text>
                  <Text style={homeStyles.reviewBody}>Quality: {item.quality_rating}/5</Text>
                  <Text style={homeStyles.reviewBody}>Cleanliness: {item.clenliness_rating}/5</Text>

                  <Text style={homeStyles.reviewBody}>{t('likes')}: {item.likes}</Text>

                  <View style={homeStyles.fixToText}>
                    <Button
                      title={t('like')}
                      color={colorPalette.lightSecondary}
                      onPress={() => this.likeReview(item.review_id)}
                    />

                    <Button
                      title={t('unlike')}
                      color={colorPalette.lightSecondary}
                      onPress={() => this.unlikeReview(item.review_id)}
                    />
                  </View>
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

export default AllReviews
