import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, Alert, ActivityIndicator, Button, FlatList, PermissionsAndroid } from 'react-native'
import { get, post, deleteEndpoint } from '../../../api'
import { baseStyles, homeStyles, colorPalette } from '../../../styles/styles'
import { AirbnbRating } from 'react-native-ratings'
import { t } from '../../../locales'
import Geolocation from 'react-native-geolocation-service'
import { getPreciseDistance } from 'geolib'

class NearbyCafes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: '',
      authToken: '',
      location: null,
      coordinates: {
        longitude: '',
        latitude: ''
      },
      ratingFilter: 0,
      locationPermission: false,
      orderedLocationData: []
    }
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Coffida location permission',
          message: 'This app requires access to your location to show you nearby cafes',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location')
        return true
      } else {
        console.log('Location permission denied')
        return false
      }
    } catch (err) {
      console.warn(err)
    }
  }

  findCoordinates = async () => {
    if (!this.state.locationPermission) {
      this.setState({ locationPermission: this.requestLocationPermission() })
    }
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({ coordinates: { longitude: position.coords.longitude, latitude: position.coords.latitude } })
      },
      (error) => {
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )
  }

  fetchAllLocations = async (url) => {
    try {
      const response = await get(url)

      if (response.status === 200) {
        const json = await response.json()

        this.setState({ locationData: json })
      } else if (response.status === 400) {
        Alert.alert('Bad request, please try again later')
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
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

  favouriteLocation = async (locationId) => {
    try {
      const response = await post('location/' + locationId + '/favourite')

      if (response.status === 200) {
        Alert.alert('Successfully favourited location')
      } else if (response.status === 400) {
        Alert.alert('Bad request, please try again later')
      } else if (response.status === 401) {
        Alert.alert('Unauthorised, please try logging out and back in, your session may have expired')
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

  unfavouriteLocation = async (locationId) => {
    try {
      const response = await deleteEndpoint('location/' + locationId + '/favourite')

      if (response.status === 200) {
        Alert.alert('Successfully unfavourited location')
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

  orderByAscendingDistance = async () => {
    const orderedLocationData = this.state.locationData.map(a => Object.assign({}, a))
    const longitude = this.state.coordinates.longitude
    const latitude = this.state.coordinates.latitude

    orderedLocationData.forEach(function (location) {
      location.distance = getPreciseDistance({ longitude: longitude, latitude: latitude }, { longitude: location.longitude, latitude: location.latitude })
    })

    orderedLocationData.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
    this.setState({ orderedLocationData: orderedLocationData })
  }

  componentDidMount = async () => {
    this.props.navigation.addListener('focus', () => {
      this.setState({ isLoading: true })
      this.findCoordinates().then(() => {
        if (this.state.locationPermission) {
          this.fetchAllLocations('find').then(() =>
            this.orderByAscendingDistance()
          ).then(() => this.setState({ isLoading: false }))
            .catch((err) => console.log(err))
        }
      })
    })
  }

  handleRatingSearch = (rating) => {
    this.setState({ isLoading: true, ratingFilter: rating })
    this.fetchAllLocations('find?overall_rating=' + rating).then(() =>
      this.orderByAscendingDistance()
    ).then(() => this.setState({ isLoading: false }))
      .catch((err) => console.log(err))
  }

  render () {
    const navigation = this.props.navigation

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
            <Text style={baseStyles.logoText}>Nearby cafes</Text>
            <Text>Minimum rating:</Text>
            <AirbnbRating
              defaultRating={this.state.ratingFilter}
              count={5}
              size={25}
              showRating={false}
              onFinishRating={this.handleRatingSearch}
            />
          </View>

          <FlatList
            data={this.state.orderedLocationData}
            renderItem={({ item }) => {
              return (
                <View style={homeStyles.cafeShopRow}>
                  <View style={homeStyles.cafeNameContainer}>
                    <Text style={homeStyles.cafeName}>{item.location_name}</Text>
                  </View>

                  <AirbnbRating
                    defaultRating={item.avg_overall_rating}
                    count={5}
                    isDisabled
                    size={20}
                    showRating={false}
                  />

                  <Text style={homeStyles.reviewBody}>Distance to venue: {item.distance} metres</Text>

                  <View style={homeStyles.fixToText}>
                    <Button
                      color={colorPalette.lightSecondary}
                      title={t('read-reviews')}
                      onPress={() => navigation.navigate('Reviews', { locationId: item.location_id })}
                    />
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

export default NearbyCafes
