import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      firstName: "",
    };
  }

  login = async() =>
  {
    try {
      const value = await AsyncStorage.getItem('auth-token')
      if(value !== null) {
        // value previously stored
        Alert.alert(value);
      }
    } catch(e) {
      // error reading value
    }
  };

  fetchUserDetails = async() => {
    try{
      let firstName = await AsyncStorage.getItem("first_name");
      this.setState({firstName: firstName})
    }
    catch (error) {
      Alert.alert("Error fetching first_name from storage: " +error)
    }
  }

  componentDidMount(){
    this.fetchUserDetails();
  }

  render(){
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>COFFIDA</Text>
        <Text style={styles.logo}>Hello {this.state.firstName}!</Text>
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
  }
})

export default Home;