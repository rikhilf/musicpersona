import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSpotifyToken } from '../services/spotifyApi';

const LoginScreen = ({ navigation }) => {
  const { token, promptAsync } = useSpotifyToken();

  useEffect(() => {
    console.log('LoginScreen - Token changed:', token ? 'YES' : 'NO');
    if (token) {
      console.log('🎉 Token received! Navigating to Loading screen');
      navigation.replace('Loading', { token });
    }
  }, [token, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 32, color: '#fff' }}>MusicPersona</Text>
      <TouchableOpacity
        onPress={() => {
          console.log('🔘 Login button pressed');
          promptAsync();
        }}
        style={{ backgroundColor: '#1DB954', padding: 16, borderRadius: 8 }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Login with Spotify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen; 