import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'
import ChangeDetails from './components/changedetails'
import SignOut from './components/signout'
import AllReviews from './components/allReviews'
import AddReview from './components/addreview'
import ReviewManagement from './components/reviewManagement'

const Drawer = createDrawerNavigator();

// TODO: Add a stack navigator inside home that goes off to add review and see reviews instead of showing them in the sidebar

const DrawerTab = () => (
  <Drawer.Navigator screenOptions={() => ({headerShown: true})}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="My reviews" component={ReviewManagement} />
    <Drawer.Screen name="All Reviews" component={AllReviews} />
    <Drawer.Screen name="Change details" component={ChangeDetails} />
    <Drawer.Screen name="Add review" component={AddReview} />
    <Drawer.Screen name="Sign out" component={SignOut} />
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