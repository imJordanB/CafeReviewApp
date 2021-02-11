import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ChangeDetails extends Component{
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

  render(){

    const navigation = this.props.navigation;

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

export default ChangeDetails;