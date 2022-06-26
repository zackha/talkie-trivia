import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Linking from 'expo-linking';

import data from '../../data/movies.json'

export interface Movie {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: any
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface Genre {
    id: number
    name: string
  }
  
  export interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }
  
  const MoviesContainer = () => {
    const movies:Movie[] = data as Movie[]
    let randomMovie:Movie = movies[Math.floor(Math.random()*movies.length)]
    const [movie] = useState(randomMovie)
    let imdbURI = 'https://www.imdb.com/title/'
    let imageURI = 'https://image.tmdb.org/t/p/original'
    let splits = 5
    let summarySplit = movie.overview.split(' ')
    let summarySubLength = Math.floor(summarySplit.length / splits)
    let clues: string[] = []
    let wordTrack = 0
    for (let i = 0; i < splits; i++) {
      for (let j = 0; j < summarySubLength; j++) {
        clues[i] = clues[i] + summarySplit[wordTrack] + " "
        wordTrack++
      }
    }

    return (
      <View style={styles.container}>
        <Text>{movie.title} ({movie.id})</Text>
        <Text>{movie.tagline}</Text>
        <Text>{movie.release_date}</Text>
        <TouchableOpacity onPress={()=>{Linking.openURL(`${imdbURI}${movie.imdb_id}`)}}>
          <Text>IMDB Link: https://www.imdb.com/title/{movie.imdb_id}/</Text>
        </TouchableOpacity>
        <Text>({summarySplit.length}) ({summarySubLength}) {summarySplit}</Text>
        <Text>{clues}</Text>
        <Image 
          source={{ uri: `${imageURI}${movie.poster_path}` }}
          style={{ width: '100%', height: '300px' }}
        />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      justifyContent: 'center'
    },
  });

  export default MoviesContainer
  