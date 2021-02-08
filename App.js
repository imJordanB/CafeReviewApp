import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  login()
  {
    let to_send = {
      email: this.state.email,
      password: this.state.password
    }

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      if(response.status == 200)
      {
        Alert.alert("Login success");
      }
      else {
        Alert.alert("Login failure");
      }
    })
    .catch((error) => {
      console.log(error);
    })
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>COFFIDA</Text>
        <View style={styles.inputView}>
          <TextInput 
          style={styles.inputText}
          placeholder="Email address"
          placeholderTextColor="#FFF"
          onChangeText={text => this.setState({email:text})}/>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#FFF"
            secureTextEntry={true}
            onChangeText={text => this.setState({password:text})}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={() => this.login()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo:{
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView:{
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText:{
    height: 50,
    color: "white"
  },
  loginText:{
    color: "#FFF"
  },
  loginBtn:{
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10
  },
})

export default App;