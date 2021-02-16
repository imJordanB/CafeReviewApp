import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, ActivityIndicator, Button, FlatList } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AllReviews extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: "",
      authToken: "",
    };
  }
  render(){
    // TODO: Conditional render: if params is there, return this, else return a message saying theres been an error
    const { cafeData } = this.props.route.params;
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>COFFIDA</Text>
          <Text style={styles.logo}>{cafeData.location_name} reviews</Text>

          <FlatList
          data={cafeData.location_reviews}
          renderItem={({item}) => {
            return(
            <View style={styles.reviewBody}>
              <AirbnbRating 
              defaultRating={item.review_overallrating}
              count={5}
              isDisabled={true}
              reviewSize={25}
            />
            <Text>"{item.review_body}"</Text>
            </View>
            )
          }}
          keyExtractor={item => item.review_id.toString()}
          />
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

export default AllReviews;