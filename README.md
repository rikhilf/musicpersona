# MusicPersona

A React Native app that analyzes your Spotify listening habits to determine your personality traits using the Big Five personality model.


NOTE: not scalable due to Spotify API limit to 25 authorized users.

## Features

- Spotify OAuth authentication
- Fetches top artists and tracks from Spotify
- Analyzes audio features to compute personality scores
- Displays results with charts and narrative summaries
- Shareable results

## Setup

### 1. Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- Spotify Developer Account
- Vercel Account (for backend)

### 2. Spotify Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
2. Create a new app
3. Add redirect URIs:
   - `http://localhost:8081` (for web development)
   - `https://auth.expo.io/@rfellner/musicpersona` (for device testing)
4. Copy your Client ID and Client Secret

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### 4. Vercel Backend Setup

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy the backend:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel:
   ```bash
   vercel env add SPOTIFY_CLIENT_ID
   vercel env add SPOTIFY_CLIENT_SECRET
   ```

### 5. Install Dependencies

```bash
npm install
```

### 6. Run the App

For web development:
```bash
npx expo start --tunnel
```

For iOS simulator:
```bash
npx expo start --ios
```

For Android emulator:
```bash
npx expo start --android
```

## Project Structure

```
musicpersona/
├── api/
│   └── spotify-auth.js          # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── BarChart.js          # OCEAN scores visualization
│   │   └── ShareButton.js       # Share functionality
│   ├── screens/
│   │   ├── LoginScreen.js       # Spotify OAuth
│   │   ├── HomeScreen.js        # Main action screen
│   │   ├── LoadingScreen.js     # Data fetching
│   │   └── ResultScreen.js      # Results display
│   ├── services/
│   │   ├── spotifyApi.js        # Spotify API calls
│   │   ├── scoringEngine.js     # Personality computation
│   │   └── storage.js           # AsyncStorage wrapper
│   └── theme.js                 # App theming
├── personalityMapping.json       # Personality mapping rules
└── vercel.json                  # Vercel configuration
```

## How It Works

1. **Authentication**: User logs in with Spotify OAuth
2. **Data Fetching**: App fetches top artists, tracks, and audio features
3. **Analysis**: Personality scores are computed using the mapping rules
4. **Results**: User sees their personality breakdown with charts and narrative

## Troubleshooting

### OAuth Issues
- Make sure redirect URIs match exactly in Spotify Dashboard

- For device: use `https://auth.expo.io/@rfellner/musicpersona`

### Backend Issues
- Ensure Vercel environment variables are set correctly
- Check Vercel function logs for errors

### Development
- Use tunnel mode for testing OAuth on device
- Clear browser cache if OAuth popup issues persist

## License

MIT
