import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { computePersonalityScores } from '../services/scoringEngine';
import { getAudioFeatures, getTopArtists, getTopTracks } from '../services/spotifyApi';

const LoadingScreen = ({ navigation, route }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from navigation params (passed from LoginScreen)
        const token = route.params?.token;
        if (!token) {
          console.error('No token available, redirecting to login');
          navigation.replace('Login');
          return;
        }

        console.log('🔄 Fetching user data from Spotify...');
        
        // Fetch user data from Spotify
        const [artists, tracks] = await Promise.all([
          getTopArtists(token),
          getTopTracks(token)
        ]);

        console.log(`📊 Found ${artists.length} artists and ${tracks.length} tracks`);

        if (tracks.length === 0) {
          console.error('No tracks found, redirecting to login');
          navigation.replace('Login');
          return;
        }

        // Get audio features for the tracks
        const trackIds = tracks.map(t => t.id);
        const audioFeatures = await getAudioFeatures(token, trackIds);
        
        console.log(`🎵 Retrieved audio features for ${audioFeatures.length} tracks`);

        // Compute personality scores
        const scores = computePersonalityScores({ artists, tracks, audioFeatures });
        console.log('🧠 Personality scores computed:', scores);

        // Navigate to results
        navigation.replace('Result', { scores });
      } catch (error) {
        console.error('❌ Error in LoadingScreen:', error);
        // On error, go back to login
        navigation.replace('Login');
      }
    };

    fetchData();
  }, [navigation, route.params]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#20B2AA" />
      <Text style={{ marginTop: 16 }}>Analyzing your music taste...</Text>
    </View>
  );
};

export default LoadingScreen; 