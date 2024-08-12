import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

export default class EnterScreen extends React.Component {
  gotoHomeScreen = () => {
    this.props.navigation.navigate('HomeScreen');
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#adbfbf',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Image
          source={require('../assets/man.png')}
          style={{
            width: 350,
            height: 350,
            marginTop: 10,
            marginRight: 10,
            borderRadius: 150,
          }}
        />
        <Text
          style={{
            color: '#5E503B',
            fontSize: 17,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Explore and find exactly what you need from our curated selection of
          products
        </Text>
        <Text
          style={{
            color: '#5E503B',
            fontSize: 17,
            textAlign: 'center',

            marginBottom: 20,
          }}>
          all in one place!{' '}
        </Text>

        <TouchableOpacity
          onPress={() => this.gotoHomeScreen()}
          style={{
            marginTop: 30,
            width: '60%',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F2D598',
            borderRadius: 15,
          }}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
