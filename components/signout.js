import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { interpolate } from 'react-native-reanimated';

class SignOut extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  signOut = async() =>
  {
      let to_send = {
        first_name: this.state.firstName == "" ? undefined : this.state.firstName,
        last_name: this.state.lastName == "" ? undefined : this.state.lastName,
        email: this.state.email == "" ? undefined : this.state.email,
        password: this.state.password == "" ? undefined : this.state.password,
      }

      let userId = await AsyncStorage.getItem("user-id")
      let authToken = await AsyncStorage.getItem("auth-token")
  
      try {
        let response = await fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
          }
        })
    
        if(response.status == 200)
        {
            // Alert.alert("Login success. Auth Token: " +json['token']);
            Alert.alert("Successfully logged out");

            await AsyncStorage.multiRemove(["user-id", "auth-token"]);
  
            this.props.navigation.navigate('Login');
        }
    
        else if(response.status == 401)
        {
            Alert.alert("Error: Unauthorised")
        }
    
        else if(response.status == 500) 
        {
            Alert.alert("There is a problem with the server, please try again later");
        }
      }
      catch(error) {
        console.log(error)
        Alert.alert("Something went wrong. Plase try again")
      }
    
  };

  componentDidMount(){
    this.signOut();
  }

  render(){
    return(
      <View>
        <Text>Signing out...</Text>
      </View>
    )
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

export default SignOut;