import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 22, marginBottom: 32 }}>Welcome to MusicPersona</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate('Loading')}
      style={{ backgroundColor: '#20B2AA', padding: 16, borderRadius: 8 }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>Generate My Music Personality</Text>
    </TouchableOpacity>
  </View>
);

export default HomeScreen; 