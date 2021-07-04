import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack' ;

import Landing from '../pages/Landing';
import Home from '../pages/Home';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();

  const options: StackNavigationOptions = {
    headerShown: false,
  };

  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={options} />
        <Stack.Screen name="Home" component={Home}  options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Routes;