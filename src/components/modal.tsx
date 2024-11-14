import React, { Dispatch, SetStateAction } from "react"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

import { colors } from "../styles/global"
import Facts from "./facts"
import { Movie } from "../models/movie"

interface MovieModalProps {
  movie: Movie
  show: boolean
  toggleModal: Dispatch<SetStateAction<boolean>>
}

const MovieModal = (props: MovieModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
          props.toggleModal(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Facts movie={props.movie} />
            <Pressable
              style={styles.button}
              onPress={() => props.toggleModal(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 20,
    borderWidth: 4,
    padding: 12,
    elevation: 2,
  },
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 20,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 5,
    justifyContent: "space-evenly",
    margin: 8,
    maxHeight: "80%",
    padding: 16,
  },
  textStyle: {
    color: colors.secondary,
    fontFamily: "Arvo-Bold",
    textAlign: "center",
  },
})

export default MovieModal
