import * as React from 'react';
import EnterScreen from './screens/EnterScreen';
import HomeScreen from './screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

const LStack = createStackNavigator();




export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <LStack.Navigator screenOptions={{ headerShown: false }}>
                               <LStack.Screen name="EnterScreen" component={EnterScreen} />


           <LStack.Screen name="HomeScreen" component={HomeScreen} />
        </LStack.Navigator>
      </NavigationContainer>
    );
  }
}