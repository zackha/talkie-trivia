import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font'

import { colors } from '../styles/global'

export interface ResetContainerProps {
    updateCorrectGuess: SetStateAction
    updateGuesses: SetStateAction
    updateMovie: SetStateAction
}

export const ResetContainer = (props: ResetContainerProps) => {
    let [fontsLoaded] = useFonts({ 'Arvo-Italic': require('../../assets/fonts/Arvo-Italic.ttf') })
    let movies: Movie[] = require('../../data/popularMovies.json')

    let newMovie = movies[Math.floor(Math.random() * movies.length)]

    if (fontsLoaded) {
        return (
            <View style={styles.container}>
                <Pressable onPress={() => {
                    props.updateCorrectGuess(false)
                    props.updateGuesses([])
                    props.updateMovie(newMovie)
                }}>
                    <Text style={styles.text}>Play Again?</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center'
    },
    text: {
        color: colors.secondary,
        flex: 1,
        fontFamily: 'Arvo-Italic',
        fontSize: 20
    }
})
