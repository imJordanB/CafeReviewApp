import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, ActivityIndicator, Button, FlatList } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ReviewManagement extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      userReviews: [],
      firstName: "",
      authToken: "",
      locationId: ""
    };
  }

  fetchUserReviews = async() => {
    try {
        let userId = await AsyncStorage.getItem("user-id");
        let authToken = await AsyncStorage.getItem("auth-token");
  
        let response = await fetch("http://10.0.2.2:3333/api/1.0.0/user/" +userId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
          },
        })
    
        if(response.status == 200)
        {
            let json = await response.json();

            this.setState({userReviews: json, isLoading: false});
        }
    
        else if(response.status == 400)
        {
            Alert.alert("Incorrect login details, please check your details and try again.")
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

  deleteUserReview = async(locationId, reviewId) => {
    try {
        let authToken = await AsyncStorage.getItem("auth-token");
  
        let response = await fetch("http://10.0.2.2:3333/api/1.0.0/location/" +locationId+ "/review/" +reviewId, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
          },
        })
    
        if(response.status == 200)
        {
            Alert.alert("Successfully deleted review")
            this.setState({isLoading: true})
            this.fetchUserReviews()
        }
    
        else if(response.status == 400)
        {
            Alert.alert("Incorrect login details, please check your details and try again.")
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

  componentDidMount = async() => {
    this.fetchUserReviews();
  }

  render(){
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator size="large" color="#00ff00"/>
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>COFFIDA</Text>
          <Text style={styles.logo}>My reviews</Text>

          {this.state.userReviews.length == 0 && <Text>You have made no user reviews</Text>}

          <FlatList
          data={this.state.userReviews.reviews}
          renderItem={({item}) => {
            return(
            <View style={styles.reviewBody}>
                <Text>{item.location.location_name}</Text>
              <AirbnbRating 
              defaultRating={item.review.overall_rating}
              count={5}
              isDisabled={true}
              reviewSize={25}
            />
            <Text>"{item.review.review_body}"</Text>

            <Text>Likes: {item.review.likes}</Text>

            <Button 
              title={"Edit"}
              onPress={() => this.editUserReview(item.review)}
            />

            <Button 
              title={"Delete"}
              onPress={() => this.deleteUserReview(item.location.location_id, item.review.review_id)}
            />
            </View>
            )
          }}
          keyExtractor={item => item.review.review_id.toString()}
          />
        </View>
      );
    }
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
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center"

  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
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
  }
})

export default ReviewManagement;