import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

class Signup extends Component{
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

  signup()
  {
    let to_send = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      if(response.status == 201)
      {
        Alert.alert("Signup success");
        this.props.navigation.navigate('Login');
        
      }
      else {
        Alert.alert("Signup failure");
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
          placeholder="First name"
          placeholderTextColor="#FFF"
          onChangeText={text => this.setState({firstName:text})}/>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Last name"
            placeholderTextColor="#FFF"
            onChangeText={text => this.setState({lastName:text})}
          />
        </View>
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

        <TouchableOpacity style={styles.signupBtn} onPress={() => this.signup()}>
          <Text style={styles.signupText}>SIGN UP</Text>
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
  signupText:{
    color: "#FFF"
  },
  signupBtn:{
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

export default Signup;