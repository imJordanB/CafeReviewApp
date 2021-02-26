import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, Alert, ActivityIndicator, Button, FlatList } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { get, deleteEndpoint } from '../../../api'
import { baseStyles, homeStyles, colorPalette } from '../../../styles/styles'
import { t } from '../../../locales'

class FavouriteLocations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      favouriteLocations: [],
      firstName: '',
      authToken: '',
      locationId: ''
    }
  }

  fetchFavouriteLocations = async () => {
    try {
      const response = await get('find?search_in=favourite')

      if (response.status === 200) {
        const json = await response.json()

        this.setState({ favouriteLocations: json, isLoading: false })
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

  unfavouriteLocation = async (locationId) => {
    try {
      const response = await deleteEndpoint('location/' + locationId + '/favourite')

      if (response.status === 200) {
        Alert.alert('Successfully unfavourited location')
        this.setState({ isLoading: true })
        this.fetchFavouriteLocations()
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
      } else if (response.status === 403) {
        Alert.alert('Forbidden, please try again later')
      } else if (response.status === 404) {
        Alert.alert('There was a problem finding this location, please try again later')
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
      this.fetchFavouriteLocations()
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
            <Text style={baseStyles.logoText}>Favourite cafes</Text>
          </View>

          <FlatList
            data={this.state.favouriteLocations}
            renderItem={({ item }) => {
              return (
                <View style={homeStyles.cafeShopRow}>
                  <View style={homeStyles.cafeNameContainer}>
                    <Text style={homeStyles.cafeName}>{item.location_name}</Text>
                  </View>

                  <View style={homeStyles.halfWidth}>
                    <AirbnbRating
                      defaultRating={item.avg_overall_rating}
                      count={5}
                      isDisabled
                      size={20}
                      showRating={false}
                    />

                    <View style={homeStyles.fixToText}>
                      <Button
                        color={colorPalette.lightSecondary}
                        title={t('add-review')}
                        onPress={() => this.props.navigation.navigate(t('add-review'), { locationId: item.location_id, locationName: item.location_name })}
                      />

                      <Button
                        color={colorPalette.lightSecondary}
                        title={t('read-reviews')}
                        onPress={() => this.props.navigation.navigate(t('all-reviews'), { locationId: item.location_id })}
                      />
                    </View>

                    <View style={homeStyles.fixToText}>
                      <Button
                        color={colorPalette.lightSecondary}
                        title={t('unfavourite')}
                        onPress={() => this.unfavouriteLocation(item.location_id)}
                      />
                    </View>
                  </View>
                </View>
              )
            }}
            keyExtractor={item => item.location_id.toString()}
          />
        </View>
      )
    }
  };
}

export default FavouriteLocations
