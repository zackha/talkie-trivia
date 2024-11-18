import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { BasicMovie, Movie } from "../models/movie"

import { colors } from "../styles/global"

interface GuessesContainerProps {
  guesses: number[]
  movie: Movie
  movies: BasicMovie[]
}

const GuessesContainer = ({ guesses, movies }: GuessesContainerProps) => {
  const getMovieTitle = (id: number | undefined) => {
    if (id && id > 0) {
      const movie = movies.find((m) => m.id === id)
      return movie ? movie.title : ""
    }
    return ""
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }).map((_, index) => {
        const guessId = guesses[index]
        const guessTitle = getMovieTitle(guessId) || "-"

        return (
          <View key={index} style={styles.guessContainer}>
            <Text style={styles.guessNumber}>{index + 1}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.guess}>
              {guessTitle}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 90,
    paddingBottom: 10,
    paddingTop: 10,
  },
  guessContainer: {
    alignContent: "flex-start",
    flex: 1,
    flexDirection: "row",
    minHeight: 18,
    textAlign: "left",
    width: 300,
  },
  guessNumber: {
    color: colors.primary,
    flex: 1,
    fontFamily: "Arvo-Bold",
    fontSize: 14,
    maxWidth: 40,
    paddingRight: 20,
    textAlign: "right",
  },
  guess: {
    color: colors.secondary,
    flex: 3,
    fontFamily: "Arvo-Regular",
    fontSize: 14,
    minHeight: 18,
    textAlign: "left",
  },
})

export default GuessesContainer
