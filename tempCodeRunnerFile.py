import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd

# Spotify credentials
client_id = '10997ebb640749debfbe59703e1a9815'
client_secret = 'ed6a850cca564b1aa4c5e61438a0eba2'

# Initialize Spotify client
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Playlist ID
playlist_id = '0JiVp7Z0pYKI8diUV6HJyQ'

# Function to fetch track information from a playlist
def get_playlist_tracks(playlist_id):
    results = sp.playlist_tracks(playlist_id)
    tracks = results['items']
    while results['next']:
        results = sp.next(results)
        tracks.extend(results['items'])
    return tracks

# Fetch tracks from the playlist
playlist_tracks = get_playlist_tracks(playlist_id)

# Extract track names and artist names
track_names = [track['track']['name'] for track in playlist_tracks]
artist_names = [', '.join([artist['name'] for artist in track['track']['artists']]) for track in playlist_tracks]

# Create a dataframe
df = pd.DataFrame({'Track Name': track_names, 'Artist(s)': artist_names})

# Export dataframe to Excel
df.to_excel('spotify_playlist_tracks.xlsx', index=False)