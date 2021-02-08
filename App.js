import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login'
import Signup from './components/signup'

const Stack = createStackNavigator();

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
}

export default App;