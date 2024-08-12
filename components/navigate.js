import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import EnterScreen from '../screens/EnterScreen';
import HomeScreen from '../screens/HomeScreen';

const HStack = createStackNavigator();

function HomeStack() {
  return (
    <HStack.Navigator screenOptions={{ headerShown: false }}>
      <HStack.Screen name="EnterScreen" component={EnterScreen} />
      <HStack.Screen name="HomeScreen" component={HomeScreen} />
    </HStack.Navigator>
  );
}

export default HomeStack;
