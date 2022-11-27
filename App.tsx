import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import uuid from 'react-native-uuid'

import GoogleLogin from './src/components/googleLogin'
import MoviesContainer from './src/components/movie'
import Player from './src/models/player'
import { Game, PlayerGame } from './src/models/game'
import { colors } from './src/styles/global'
import { firebaseConfig } from './src/config/firebase'
import { useAuthentication } from './src/utils/hooks/useAuthentication'

/* TODO: Firebase
https://docs.expo.dev/guides/using-firebase/
https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app/
*/
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
WebBrowser.maybeCompleteAuthSession()

export default function App() {
  // init user
  const player = new Player()
  player.id = ''
  player.name = ''
  const { user } = useAuthentication()

  // init new movie
  let movies: Movie[] = require('./data/popularMovies.json')
  let basicMovies: BasicMovie[] = require('./data/basicMovies.json')
  let newMovie = movies[Math.floor(Math.random() * movies.length)]

  // init new game
  // TODO: This should be initiated separately on a global level for all users
  let game: Game = {
    date: new Date,
    guessesMax: 5,
    id: uuid.v4().toString(),
    movie: newMovie
  } 
  let playerGame: PlayerGame = {
    correctAnswer: false,
    endDate: new Date,
    game: game,
    guesses: [],
    player: player,
    startDate: new Date, 
  }

  React.useEffect(() => {
    if (user) {
      playerGame.player.id = '456'
      playerGame.player.name = user?.displayName ? user.displayName.toString() : 'unknown'
    } else {
      playerGame.player.id = uuid.v4().toString()
      playerGame.player.name = ''
    }
  }, [user])

  return (
    <View style={styles.container}>
      <MoviesContainer movies={basicMovies} playerGame={playerGame} />
      <GoogleLogin player={playerGame.player}/>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
})
