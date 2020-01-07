
import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import Login from "./app/auth/Login";
import HomeScreen from "./app/HomeScreen";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// const AuthNavigator = createStackNavigator({
//   Login: Login,
// });

const AppNavigator = createSwitchNavigator({
  Home: HomeScreen,
  // Auth: AuthNavigator,
});

const AppContainer = createAppContainer(AppNavigator);
