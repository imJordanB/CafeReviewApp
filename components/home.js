import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component{
  constructor(props){
    super(props);



    this.state = {
      isLoading: false,
      email: "",
      password: ""
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

  render(){

    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.logo} ariaLabel='Coffida'>COFFIDA</Text>
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
          <Text style={styles.loginText}>TEST BUTTON</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Signup')}>
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
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
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