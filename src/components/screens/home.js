import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, Alert, ActivityIndicator, Button, FlatList, TextInput } from 'react-native'
import { get, post, deleteEndpoint } from '../../api/'
import { baseStyles, homeStyles, colorPalette } from '../../styles/styles'
import { AirbnbRating } from 'react-native-ratings'
import { t } from '../../locales'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: '',
      authToken: '',
      cafeSearchTerm: '',
      searched: false
    }
  }

  getEndpoint = async (url) => {
    try {
      const response = await get(url)

      if (response.status === 200) {
        const json = await response.json()

        this.setState({ locationData: json, isLoading: false })
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

  searchCafeNames () {
    this.setState({ isLoading: true, searched: true })
    this.getEndpoint('find?q=' + this.state.cafeSearchTerm)
  }

  resetSearch () {
    this.setState({ isLoading: true, searched: false })
    this.getEndpoint('find')
  }

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      this.setState({ isLoading: true })
      this.getEndpoint('find')
    })
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
            <Text style={baseStyles.logoText}>COFFIDA</Text>

            <View style={baseStyles.inputView}>
              <TextInput
                style={baseStyles.inputText}
                placeholder='Search cafe names'
                placeholderTextColor='#FFF'
                onChangeText={text => this.setState({ cafeSearchTerm: text })}
                ariaLabel={t('first-name')}
              />
            </View>
          </View>

          <View style={homeStyles.fixToText}>
            <Button
              color={colorPalette.lightSecondary}
              title='Search'
              onPress={() => this.searchCafeNames()}
            />

            {this.state.searched &&
              <Button
                color={colorPalette.lightSecondary}
                title='Reset search'
                onPress={() => this.resetSearch()}
              />}
          </View>

          {this.state.searched &&
            <Text style={baseStyles.regularText}>
              Showing results for '{this.state.cafeSearchTerm}'
            </Text>}

          <FlatList
            data={this.state.locationData}
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
                      showRating={false}
                      size={20}
                    />
                    <View style={homeStyles.fixToText}>
                      <Button
                        color={colorPalette.lightSecondary}
                        title={t('add-review')}
                        onPress={() => navigation.navigate(t('add-review'), { locationId: item.location_id, locationName: item.location_name })}
                      />

                      <Button
                        color={colorPalette.lightSecondary}
                        title={t('read-reviews')}
                        onPress={() => navigation.navigate(t('all-reviews'), { locationId: item.location_id })}
                      />
                    </View>

                    <View style={homeStyles.fixToText}>
                      <Button
                        color={colorPalette.lightSecondary}
                        title={t('favourite')}
                        onPress={() => this.favouriteLocation(item.location_id)}
                      />

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

export default Home
