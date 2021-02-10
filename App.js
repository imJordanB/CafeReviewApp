import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'

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
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
}

export default App;