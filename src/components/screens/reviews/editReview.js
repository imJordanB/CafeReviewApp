import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, TextInput, View, Alert, TouchableOpacity } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { patch } from '../../../api'
import { baseStyles } from '../../../styles/styles'
import { t } from '../../../locales'
const badWordsFilter = require('../../shared/profanityFilter')

class EditReview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: '',
      authToken: '',
      locationId: '',
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      cleanlinessRating: '',
      reviewBody: '',
      reviewId: ''
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

  handleRatingUpdate = (rating, variableToUpdate) => {
    this.setState({ [variableToUpdate]: rating.toString() })
  }

  updateReview = async () => {
    const state = this.state

    if (state.overallRating === '' || state.priceRating === '' || state.qualityRating === '' || state.cleanlinessRating === '' || state.reviewBody === '') {
      Alert.alert('Please make sure you complete all fields before trying to submit')
    } else {
      const cleanText = badWordsFilter(this.state.reviewBody)

      const toSend = {
        overall_rating: Number(this.state.overallRating),
        price_rating: Number(this.state.priceRating),
        quality_rating: Number(this.state.qualityRating),
        clenliness_rating: Number(this.state.cleanlinessRating),
        review_body: cleanText
      }

      try {
        const response = await patch('location/' + this.state.locationId + '/review/' + this.state.reviewId, JSON.stringify(toSend))

        if (response.status === 200) {
          Alert.alert('Successfully updated your review, thank you')
          this.props.navigation.navigate(t('my-reviews'))
        } else if (response.status === 400) {
          Alert.alert('Bad request, please try again')
        } else if (response.status === 401) {
          Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
        } else if (response.status === 404) {
          Alert.alert("There was a problem updating your review for this location, please go back and press 'Edit review' again")
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
      const { review, locationId } = this.props.route.params
      this.setState({ overallRating: review.overall_rating, priceRating: review.price_rating, qualityRating: review.quality_rating, cleanlinessRating: review.clenliness_rating, reviewBody: review.review_body, reviewId: review.review_id, locationId: locationId })
    })
  }

  render () {
    return (
      <View style={baseStyles.centerTopContainer}>
        <Text style={baseStyles.header}>{t('edit-review')}</Text>

        <View style={baseStyles.textArea}>

          <TextInput
            style={baseStyles.textAreaText}
            defaultValue={this.state.reviewBody}
            onChangeText={text => this.setState({ reviewBody: text })}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={baseStyles.centredText}>
          <Text style={baseStyles.centredText}>{t('overall-rating')}:</Text>
          <AirbnbRating
            defaultRating={this.state.overallRating}
            count={5}
            size={25}
            showRating={false}
            onFinishRating={(rating) => this.handleRatingUpdate(rating, 'overallRating')}
          />
        </View>

        <View style={baseStyles.centredText}>
          <Text style={baseStyles.centredText}>{t('price-rating')}:</Text>
          <AirbnbRating
            defaultRating={this.state.priceRating}
            count={5}
            size={25}
            showRating={false}
            onFinishRating={(rating) => this.handleRatingUpdate(rating, 'priceRating')}
          />
        </View>

        <View style={baseStyles.centredText}>
          <Text style={baseStyles.centredText}>{t('quality-rating')}:</Text>
          <AirbnbRating
            defaultRating={this.state.qualityRating}
            count={5}
            size={25}
            showRating={false}
            onFinishRating={(rating) => this.handleRatingUpdate(rating, 'qualityRating')}
          />
        </View>

        <View style={baseStyles.centredText}>
          <Text style={baseStyles.centredText}>{t('cleanliness-rating')}:</Text>
          <AirbnbRating
            defaultRating={this.state.cleanlinessRating}
            count={5}
            size={25}
            showRating={false}
            onFinishRating={(rating) => this.handleRatingUpdate(rating, 'cleanlinessRating')}
          />
        </View>

        <TouchableOpacity
          ariaRole='button'
          style={baseStyles.confirmBtn}
          onPress={() => this.updateReview()}
        >
          <Text style={baseStyles.confirmBtnText}>{t('update-review')}</Text>
        </TouchableOpacity>

      </View>
    )
  };
}

export default EditReview
