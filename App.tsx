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
  const player = new Player()
  player.id = '123'
  player.name = 'test'
  const { user } = useAuthentication()

  React.useEffect(() => {
    if (user) {
      player.id = '456'
      player.name = user.displayName
    } else {
      player.id = uuid.v4().toString()
      player.name = 'anonymous'
    }
  }, [user])

  return (
    <View style={styles.container}>
      <MoviesContainer />
      <GoogleLogin player={player}/>
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
