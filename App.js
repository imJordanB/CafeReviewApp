import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'
import ChangeDetails from './components/changedetails'

const Drawer = createDrawerNavigator();

const DrawerTab = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Change details" component={ChangeDetails} />
  </Drawer.Navigator>
);

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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={() => ({headerShown: false})} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Menu" component={DrawerTab} options={() => ({headerShown: false})}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
}

export default App;