import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, ActivityIndicator, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      locationData: [],
      firstName: "",
      authToken: "",
    };
  }

  fetchUserDetails = async() => {
    try{
      let firstName = await AsyncStorage.getItem("first_name");
      this.setState({firstName: firstName})
    }
    catch (error) {
      Alert.alert("Error fetching data from storage: " +error)
    }
  }

  fetchAllLocations = async() => {
    let authToken = await AsyncStorage.getItem("auth-token");
    try {
      let response = await fetch("http://10.0.2.2:3333/api/1.0.0/find", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': authToken
        }
      })
  
      if(response.status == 200)
      {
          // Alert.alert("Login success. Auth Token: " +json['token']);

          let json = await response.json();

          this.setState({locationData: json, isLoading: false})
      }
  
      else if(response.status == 400)
      {
          Alert.alert("Incorrect login details, please check your details and try again.")
      }
  
      else 
      {
          //Alert.alert(this.state.authToken);
          //Alert.alert(response.status.toString());
          //Alert.alert("Server error, please try again later");
      }
    }
    catch(error) {
      console.log(error)
      Alert.alert("Something went wrong. Plase try again")
    }
  }

  componentDidMount(){
    this.fetchUserDetails();
    this.fetchAllLocations();
  }

  render(){
    const navigation = this.props.navigation;

    if(this.state.isLoading) {
      return(
        <View>
          <ActivityIndicator />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.logo}>COFFIDA</Text>
          <Text style={styles.logo}>Hello {this.state.firstName}!</Text>

          <FlatList
          data={this.state.locationData}
          renderItem={({item}) => {
            return(
            <View>
            <Text>{item.location_name}</Text>
            <Button 
              title="Read reviews"
              onPress={() => Alert.alert("Review navigation")}
            />
            </View>
            )
          }}
          keyExtractor={item => item.location_id.toString()}
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
  test: {
    flex: 1,
    backgroundColor: '#AAA'
  }
})

export default Home;