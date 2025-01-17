import React from "react"
import {
  Image,
  Text,
  Pressable,
  View,
  Alert,
  StyleProp,
  ViewStyle,
} from "react-native"
import * as Linking from "expo-linking"
import { actorsStyles } from "../styles/actorsStyles"
import { Actor } from "../models/movie"

interface ActorProps {
  actor: Actor
  imdbId?: string
  style?: StyleProp<ViewStyle>
  onActorPress?: (actor: Actor) => void
}

interface ActorsProps {
  actors: Actor[]
  maxDisplay?: number
  containerStyle?: StyleProp<ViewStyle>
}

const ActorContainer = ({ actor, imdbId, style, onActorPress }: ActorProps) => {
  const imageURI = "https://image.tmdb.org/t/p/original"
  const imdbURI = imdbId ? `https://www.imdb.com/name/${imdbId}` : null

  const handlePress = () => {
    if (onActorPress) {
      onActorPress(actor)
      return
    }

    if (imdbURI) {
      Linking.canOpenURL(imdbURI)
        .then((supported) => {
          if (supported) {
            Linking.openURL(imdbURI)
          } else {
            Alert.alert("Unable to open IMDb link")
          }
        })
        .catch(() => {
          Alert.alert("Error opening link")
        })
    } else {
      Alert.alert("IMDb link unavailable", "No link found for this actor.")
    }
  }

  const actorImage = actor.profile_path
    ? { uri: `${imageURI}${actor.profile_path}` }
    : require("../../assets/actor_default.png")

  return (
    <View style={[actorsStyles.actorContainer, style]} accessible>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          { opacity: pressed ? 0.6 : 1.0 },
          actorsStyles.actorPressable,
        ]}
        role="button"
        accessibilityLabel={`View details for ${actor.name}`}
      >
        <Image
          source={actorImage}
          style={actorsStyles.actorImage}
          resizeMode="cover"
          defaultSource={require("../../assets/actor_default.png")}
        />
        <Text
          style={actorsStyles.actorText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {actor.name}
        </Text>
      </Pressable>
    </View>
  )
}

export const Actors = ({
  actors,
  maxDisplay = 3,
  containerStyle,
}: ActorsProps) => {
  if (!actors || actors.length === 0) {
    return null
  }

  return (
    <View style={[actorsStyles.actorsContainer, containerStyle]}>
      {actors.slice(0, maxDisplay).map((actor) => (
        <ActorContainer
          key={`${actor.id}-${actor.name}`}
          actor={actor}
          imdbId={actor.imdb_id} // TODO: this data is not available
        />
      ))}
    </View>
  )
}

export default Actors
