import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Player from '../models/player'
import PlayerStats from '../models/playerStats'
import WinChart from './winChart'

export interface PlayerStatsContainerProps {
    player: Player
    playerStats: PlayerStats
}

const PlayerStatsContainer = (props: PlayerStatsContainerProps) => {
    return (
        <View style={styles.container}>
            <Text>{props.playerStats.games}</Text>
            <Text>{props.playerStats.currentStreak}</Text>
            <Text>{props.playerStats.maxStreak}</Text>
            <Text>{props.playerStats.wins[0]}</Text>
            <Text>{props.playerStats.wins[1]}</Text>
            <Text>{props.playerStats.wins[2]}</Text>
            <Text>{props.playerStats.wins[3]}</Text>
            <Text>{props.playerStats.wins[4]}</Text>
            <WinChart wins={props.playerStats.wins} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
})

export default PlayerStatsContainer
