import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Movie } from './movie'
import { useFonts, Arvo_400Regular, Arvo_700Bold } from '@expo-google-fonts/arvo'

import { colors } from '../styles/global'

interface GuessesContainerProps {
    guesses: number[]
    movie: Movie
    movies: BasicMovie[]
}

const GuessesContainer = (props: GuessesContainerProps) => {
    let [fontsLoaded] = useFonts({ Arvo_400Regular, Arvo_700Bold })
    let getMovieTitle = (id: number) => {
        if (id > 0) {
            let movie = props.movies.find(m => m.id == id) as Movie
            return movie.title
        } else {
            return ''
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.guessContainer}>
                <Text style={styles.guessNumber}>1</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.guess}>{getMovieTitle(props.guesses[0])}</Text>
            </View>
            <View style={styles.guessContainer}>
                <Text style={styles.guessNumber}>2</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.guess}>{getMovieTitle(props.guesses[1])}</Text>
            </View>
            <View style={styles.guessContainer}>
                <Text style={styles.guessNumber}>3</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.guess}>{getMovieTitle(props.guesses[2])}</Text>
            </View>
            <View style={styles.guessContainer}>
                <Text style={styles.guessNumber}>4</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.guess}>{getMovieTitle(props.guesses[3])}</Text>
            </View>
            <View style={styles.guessContainer}>
                <Text style={styles.guessNumber}>5</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.guess}>{getMovieTitle(props.guesses[4])}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        maxWidth: 280,
        width: 280
    },
    guessContainer: {
        alignItems: 'flex-start',
        border: 2,
        borderColor: colors.primary,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        maxWidth: 260,
        padding: 4,
        textAlign: 'left',
        width: 260
    },
    guessNumber: {
        alignSelf: 'flex-start',
        color: colors.primary,
        flex: 1,
        fontFamily: 'Arvo_700Bold',
        fontSize: 14,
        maxWidth: 40,
        paddingRight: 20,
        textAlign: 'left'
    },
    guess: {
        color: colors.secondary,
        flex: 1,
        fontFamily: 'Arvo_400Regular',
        fontSize: 14,
        textAlign: 'center'
    }
})

export default GuessesContainer
