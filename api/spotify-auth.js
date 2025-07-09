// api/spotify-auth.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Allow CORS for development/testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log('Received POST', req.body)

  // Respond to preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
    
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code, redirectUri } = req.body;
  if (!code || !redirectUri) {
    return res.status(400).json({ error: 'Missing code or redirectUri' });
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('client_id', process.env.SPOTIFY_CLIENT_ID);
  params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);

  console.log('Sending params:', params.toString());
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const json = await response.json();
    if (!response.ok) {
      console.error('Spotify token error:', json);
      return res.status(response.status).json({ error: json });
    }
    return res.status(200).json(json);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
} 