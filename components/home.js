import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, ActivityIndicator, Button, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: '',
      authToken: ''
    }
  }

  fetchUserDetails = async () => {
    try {
      const firstName = await AsyncStorage.getItem('first_name')
      this.setState({ firstName: firstName })
    } catch (error) {
      Alert.alert('Error fetching data from storage: ' + error)
    }
  }

  fetchAllLocations = async () => {
    const authToken = await AsyncStorage.getItem('auth-token')
    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': authToken
        }
      })

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
    const authToken = await AsyncStorage.getItem('auth-token')
    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/favourite', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': authToken
        }
      })

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
    const authToken = await AsyncStorage.getItem('auth-token')
    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId + '/favourite', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': authToken
        }
      })

      if (response.status === 200) {
        // Alert.alert("Login success. Auth Token: " +json['token']);

        // let json = await response.json();

        // this.setState({locationData: json, isLoading: false})

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

  componentDidMount () {
    this.fetchUserDetails()
    this.fetchAllLocations()
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
        <View style={styles.container}>
          <Text style={styles.logo}>COFFIDA</Text>
          <Text>Hello {this.state.firstName}!</Text>
          {/* TODO: Change the cafeData to pass in only the location id so that on the allReviews page, it does a GET request on the location ID  */}
          <FlatList
            data={this.state.locationData}
            renderItem={({ item }) => {
              return (
                <View style={styles.cafeShopRow}>
                  <Text>{item.location_name}</Text>

                  <Button
                    style={styles.cafeButton}
                    title='Add review'
                    onPress={() => navigation.navigate('Add review', { locationId: item.location_id, locationName: item.location_name })}
                  />

                  <Button
                    style={styles.cafeButton}
                    title='Read reviews'
                    onPress={() => navigation.navigate('All Reviews', { locationId: item.location_id })}
                  />

                  <Button
                    style={styles.cafeButton}
                    title='Favourite'
                    onPress={() => this.favouriteLocation(item.location_id)}
                  />

                  <Button
                    style={styles.cafeButton}
                    title='Unfavourite'
                    onPress={() => this.unfavouriteLocation(item.location_id)}
                  />

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
  cafeShopRow: {
    marginBottom: 20,
    backgroundColor: '#B8B8B8'
  },
  cafeButton: {
    marginBottom: 20
  }
})

export default Home
