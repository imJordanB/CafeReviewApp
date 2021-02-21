import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, ActivityIndicator, Button, FlatList, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BadWordsFilter from 'bad-words';

class AddReview extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: "",
      authToken: "",
      locationId: "",
      overallRating: "",
      priceRating: "",
      qualityRating: "",
      cleanlinessRating: "",
      reviewBody: ""
    };
  }

  overallRatingUpdate = (rating) => {
    this.setState({overallRating: rating.toString()})
  }

  priceRatingUpdate = (rating) => {
    this.setState({priceRating: rating.toString()})
  }

  qualityRatingUpdate = (rating) => {
    this.setState({qualityRating: rating.toString()})
  }

  cleanlinessRatingUpdate = (rating) => {
    this.setState({cleanlinessRating: rating.toString()})
  }

  profanityFilter = (text) => {
    const filter = new BadWordsFilter()
    filter.addWords("tea", "cakes", "pastries", "pastry", "cake")

    return filter.clean(text);
  }

  addReview = async() => {
    let cleanText = this.profanityFilter(this.state.reviewBody)

    const { locationId } = this.props.route.params;

    let authToken = await AsyncStorage.getItem("auth-token")

    let to_send = {
      overall_rating: Number(this.state.overallRating),
      price_rating: Number(this.state.priceRating),
      quality_rating: Number(this.state.qualityRating),
      clenliness_rating: Number(this.state.cleanlinessRating),
      review_body: cleanText
    }
  
      try {
        let response = await fetch("http://10.0.2.2:3333/api/1.0.0/location/" +locationId+ "/review", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
          },
          body: JSON.stringify(to_send)
        })
    
        // TODO: Look at swagger for all the different status codes and deal with each one
        if(response.status == 201)
        {
            Alert.alert("Successfully submitted your review, thank you");
            this.props.navigation.navigate("Home");
        }
    
        else if(response.status == 400)
        {
            Alert.alert("400")
        }
    
        else 
        {
            Alert.alert("Server error, please try again later");
        }
      }
      catch(error) {
        console.log(error)
        Alert.alert("Something went wrong. Plase try again")
      }
  }

  render(){
    // TODO: Conditional render: if params is there, return this, else return a message saying theres been an error
    const { locationName } = this.props.route.params;
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>COFFIDA</Text>
          <Text style={styles.logo}>{locationName} - Add a review</Text>

          <View style={styles.centredText}>
            <Text style={styles.centredText}>Overall rating:</Text>
            <AirbnbRating 
                defaultRating={0}
                count={5}
                reviewSize={25}
                showRating={false}
                onFinishRating={this.overallRatingUpdate}
              />
          </View>

          <View style={styles.centredText}>
            <Text style={styles.centredText}>Price rating:</Text>
            <AirbnbRating 
                defaultRating={0}
                count={5}
                reviewSize={25}
                showRating={false}
                onFinishRating={this.priceRatingUpdate}
              />
          </View>

          <View style={styles.centredText}>
            <Text style={styles.centredText}>Quality rating:</Text>
            <AirbnbRating 
                defaultRating={0}
                count={5}
                reviewSize={25}
                showRating={false}
                onFinishRating={this.qualityRatingUpdate}
              />
          </View>

          <View style={styles.centredText}>
            <Text style={styles.centredText}>Cleanliness rating:</Text>
            <AirbnbRating 
                defaultRating={0}
                count={5}
                reviewSize={25}
                showRating={false}
                onFinishRating={this.cleanlinessRatingUpdate}
              />
          </View>

        <View style={styles.inputView}>
          
        <TextInput
            style={styles.inputText}
            placeholder="Enter your experience here"
            placeholderTextColor="#FFF"
            onChangeText={text => this.setState({reviewBody:text})}
          />
        </View>

          <TouchableOpacity style={styles.loginBtn} onPress={() => this.addReview()}>
          <Text style={styles.loginText}>Add review</Text>
        </TouchableOpacity>

        </View>
      );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"

  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  loginText: {
    color: "#FFF"
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10
  },
  signupBtn: {
    width: "80%",
    backgroundColor: "#AAA",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10
  },
  reviewBody: {
    flex: 1,
    backgroundColor: '#668b8b',
    marginBottom: 10
  },
  centredText: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
})

export default AddReview;