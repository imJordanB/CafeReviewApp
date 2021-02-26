import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { homeStyles, colorPalette } from '../../styles/styles'
import { t } from '../../locales'

class Review extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      userReviews: [],
      firstName: '',
      authToken: '',
      locationId: '',
      displayImage: true
    }

    this.displayImage = true
  }

    onErrorImage = () => {
      if (this.state.displayImage) {
        this.setState({ displayImage: false })
        console.log(this.state.displayImage)
      }
    }

    render () {
      return (
        <View style={homeStyles.cafeShopRow}>
          <View style={homeStyles.cafeNameContainer}>
            <Text style={homeStyles.cafeName}>{this.props.review.location.location_name}</Text>
          </View>

          <View style={homeStyles.halfWidth}>
            <AirbnbRating
              defaultRating={this.props.review.review.overall_rating}
              count={5}
              isDisabled
              size={20}
            />

            {this.displayImage
              ? (
                <Image
                  source={{ uri: 'http://10.0.2.2:3333/api/1.0.0/location/' + this.props.review.location.location_id + '/review/' + this.props.review.review.review_id + '/photo?timestamp=' + Date.now() }}
                  style={{ width: 200, height: 200 }}
                  onError={(e) => {
                    if (this.displayImage) {
                      this.displayImage = false
                    }
                  }}
                />
                )
              : <View />}

            <Text style={homeStyles.reviewBody}>"{this.props.review.review_body}"</Text>

            <Text style={homeStyles.reviewBody}>Price: {this.props.review.price_rating}/5</Text>
            <Text style={homeStyles.reviewBody}>Quality: {this.props.review.quality_rating}/5</Text>
            <Text style={homeStyles.reviewBody}>Cleanliness: {this.props.review.clenliness_rating}/5</Text>

            <Text style={homeStyles.reviewBody}>{t('likes')}: {this.props.review.review.likes}</Text>

            <View style={homeStyles.fixToText}>
              <Button
                title={t('add-photo')}
                color={colorPalette.lightSecondary}
                onPress={() => this.props.navigation.navigate(t('add-photo'), { locationId: this.props.review.location.location_id, reviewId: this.props.review.review.review_id })}
              />

              <Button
                title={t('remove-photo')}
                color={colorPalette.lightSecondary}
                onPress={() => this.deletePhoto(this.props.review.location.location_id, this.props.review.review.review_id)}
              />
            </View>

            <View style={homeStyles.fixToText}>
              <Button
                title={t('edit-review')}
                color={colorPalette.lightSecondary}
                onPress={() => this.props.navigation.navigate(t('edit-review'), { review: this.props.review.review, locationId: this.props.review.location.location_id })}
              />

              <Button
                title={t('delete-review')}
                color={colorPalette.lightSecondary}
                onPress={() => this.deleteUserReview(this.props.review.location.location_id, this.props.review.review_id)}
              />
            </View>
          </View>
        </View>
      )
    }
}

export default Review
