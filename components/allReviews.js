import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, ActivityIndicator, Button, FlatList } from 'react-native';
import ReactStars from 'react-stars'
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
    const { cafeData } = this.props.route.params;
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>COFFIDA</Text>
          <Text style={styles.logo}>{cafeData.location_name} reviews</Text>

          <FlatList
          data={cafeData.location_reviews}
          renderItem={({item}) => {
            return(
            <View>
            <Text>"{item.review_body}"</Text>
            <ReactStars 
              count={5}
              size={24}
              value={item.overall_rating}
            />
            <Text>Overall Rating: {item.overall_rating}</Text>
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
  test: {
    flex: 1,
    backgroundColor: '#AAA'
  }
})

export default AllReviews;