import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = '6eac65e033cc45ff80e2635afc87a85a';

// Use the correct redirect URI based on platform
// const REDIRECT_URI = Platform.OS === 'web' 
//   ? 'https://auth.expo.io/@rfellner/musicpersona'// 'exp://127.0.0.1:8081' // 'exp://192.168.4.194:8081'// 'https://auth.expo.io/@rfellner/musicpersona' // 'http://localhost:8081'
//   : makeRedirectUri({ useProxy: true, projectNameForProxy: '@rfellner/musicpersona' });

const REDIRECT_URI = makeRedirectUri({ useProxy: true, projectNameForProxy: '@rfellner/musicpersona' });

const SCOPES = ['user-top-read', 'user-read-recently-played'];
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

// Debug: Log the actual redirect URI
console.log('Generated Redirect URI:', REDIRECT_URI);
console.log('Platform:', Platform.OS);

export function useSpotifyToken() {
  const [token, setToken] = useState(null);
  const [request, response, promptAsync] = useAuthRequest({
    clientId: CLIENT_ID,
    scopes: SCOPES,
    redirectUri: REDIRECT_URI,
    usePKCE: true,
    responseType: 'code',
  }, {
    authorizationEndpoint: AUTH_ENDPOINT,
    tokenEndpoint: TOKEN_ENDPOINT,
  });

  useEffect(() => {
    console.log('=== OAuth Response Debug ===');
    console.log('Response Type:', response?.type);
    console.log('Response Params:', response?.params);
    console.log('OAuth Response:', response);

    const getToken = async () => {
      if (response?.type === 'success') {
        console.log('✅ OAuth Success! Code received');
        const { code } = response.params;
        console.log('Authorization code:', code ? 'Present' : 'Missing');
        
        try {
          console.log('🔄 Exchanging code for token via backend...');
          
          // Use the Vercel backend endpoint for code exchange


          console.log('About to POST to backend:', {
            code,
            REDIRECT_URI,
          });

          const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || '';
          console.log('apiBaseUrl:', apiBaseUrl);

          const { codeVerifier } = request;
          console.log('codeVerifier:', codeVerifier);

          const tokenResponse = await fetch(`${apiBaseUrl}/api/spotify-auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: code,
              redirectUri: REDIRECT_URI,
              codeVerifier: codeVerifier,
            }),
          });
          
          if (!tokenResponse.ok) {
            throw new Error(`Token exchange failed: ${tokenResponse.status}`);
          }
          
          const tokenResult = await tokenResponse.json();
          console.log('✅ Token received from backend:', !!tokenResult.access_token);
          setToken(tokenResult.access_token);
        } catch (error) {
          console.error('❌ Token exchange failed:', error);
          console.error('Error details:', error.message);
        }
      } else if (response?.type === 'error') {
        console.error('❌ OAuth Error Response:', response);
      } else if (response?.type === 'cancel') {
        console.log('🚫 OAuth Cancelled');
      } else if (response?.type === 'dismiss') {
        console.log('🚫 OAuth Dismissed');
      } else {
        console.log('⏳ Waiting for OAuth response...');
      }
    };
    getToken();
  }, [response]);

  return { token, promptAsync, request };
}

export async function getTopArtists(token) {
  if (!token) {
    console.error('No token available for API call');
    return [];
  }
  
  try {
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return [];
  }
}

export async function getTopTracks(token) {
  if (!token) {
    console.error('No token available for API call');
    return [];
  }
  
  try {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
}

export async function getAudioFeatures(token, trackIds) {
  if (!token || !trackIds || trackIds.length === 0) {
    console.error('No token or track IDs available for API call');
    return [];
  }
  
  try {
    const response = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.audio_features || [];
  } catch (error) {
    console.error('Error fetching audio features:', error);
    return [];
  }
} 