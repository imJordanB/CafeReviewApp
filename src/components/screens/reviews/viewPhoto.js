import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'

class ViewPhoto extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: '',
      authToken: '',
      locationId: '',
      reviewId: '',
      imageData: ''
    }
  }

  componentDidMount () {
    this.props.navigation.addListener('focus', () => {
      const { locationId, reviewId } = this.props.route.params
      this.setState({ locationId: locationId, reviewId: reviewId })
    })
  }

  render () {
    const photoUri = 'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.locationId + '/review/' + this.state.reviewId + '/photo?timestamp=' + Date.now()
    return (
      <View style={styles.container}>

        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: photoUri }}
        />
      </View>
    )
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
    borderRadius: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  centredText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

export default ViewPhoto
