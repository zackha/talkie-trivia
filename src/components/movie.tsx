import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

import CluesContainer from './clues'
import GuessesContainer from './guesses'
import NetworkContainer from './network'
import MovieModal from './modal'
import PickerContainer from './picker'
import TitleHeader from './titleHeader'
import GoogleLogin from './googleLogin'
import ResetContainer from './reset'
import { BasicMovie } from '../models/movie'
import { PlayerGame } from '../models/game'
import PlayerStats from '../models/playerStats'
import { firebaseConfig } from '../config/firebase'

SplashScreen.preventAutoHideAsync()

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

interface MovieContainerProps {
  isNetworkConnected: boolean
  movies: BasicMovie[]
  playerGame: PlayerGame
  playerStats: PlayerStats
  updatePlayerGame: Dispatch<SetStateAction<PlayerGame>>
}

const MoviesContainer = (props: MovieContainerProps) => {
  let [fontsLoaded] = useFonts({
    'Arvo-Bold': require('../../assets/fonts/Arvo-Bold.ttf'),
    'Arvo-Italic': require('../../assets/fonts/Arvo-Italic.ttf'),
    'Arvo-Regular': require('../../assets/fonts/Arvo-Regular.ttf')
  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  const [enableSubmit, setEnableSubmit] = useState<boolean>(!props.playerGame.correctAnswer)
  const [showModal, setShowModal] = useState<boolean>(false)

  const confetti = useRef<ConfettiCannon>(null)

  useEffect(() => {
    const setPlayerGame = async () => {
      try {
        // TODO: Below seems like a hacky way to get this to a plain JS object
        const docRef = await setDoc(doc(db, 'playerGames', props.playerGame.id), JSON.parse(JSON.stringify(props.playerGame)))
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }

    const setPlayerStats = async (correctAnswer: boolean) => {
      let ps = props.playerStats
      
      // TODO: update playerStats
      if (correctAnswer) {

      } else {

      }

      try {
        // TODO: Below seems like a hacky way to get this to a plain JS object
        const docRef = await setDoc(doc(db, 'playerStats', props.playerGame.player.id), JSON.parse(JSON.stringify(ps)))
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }

    if (props.playerGame.guesses.length > 4) {
      setPlayerStats(false)
      setEnableSubmit(false)
    }
    if (props.playerGame.correctAnswer && showModal) {
      confetti.current?.start()
      setPlayerStats(true)
      setEnableSubmit(false)
    }

    if (props.playerGame.player.name != '') {
      setPlayerGame()
    }
  }, [props.playerGame])

  if (!fontsLoaded) { return null }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NetworkContainer isConnected={props.isNetworkConnected} />
      <TitleHeader />
      <CluesContainer
        correctGuess={props.playerGame.correctAnswer}
        guesses={props.playerGame.guesses}
        summary={props.playerGame.game.movie.overview} />
      <PickerContainer
        enableSubmit={enableSubmit}
        playerGame={props.playerGame}
        movies={props.movies}
        toggleModal={setShowModal}
        toggleSubmit={setEnableSubmit}
        updatePlayerGame={props.updatePlayerGame} />
      <GuessesContainer
        guesses={props.playerGame.guesses}
        movie={props.playerGame.game.movie}
        movies={props.movies} />
      <ResetContainer
        playerGame={props.playerGame}
        updatePlayerGame={props.updatePlayerGame} />
      <GoogleLogin player={props.playerGame.player} />
      <MovieModal
        movie={props.playerGame.game.movie}
        show={showModal}
        toggleModal={setShowModal} />
      <ConfettiCannon
        autoStart={false}
        count={100}
        fadeOut={true}
        fallSpeed={2000}
        origin={{ x: -100, y: -20 }}
        ref={confetti} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    marginTop: 24,
    width: '90%'
  }
})

export default MoviesContainer
