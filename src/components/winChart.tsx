import React from 'react'
import { StyleSheet, View } from 'react-native'
import { VictoryPie, VictoryTheme } from 'victory'
import { colors } from '../styles/global'

export interface WinChartProps {
    wins: number[]
}

interface selectedSlice {
    label: string
    value: number
}

const WinChart = (props: WinChartProps) => {
    console.log(props.wins)

    const keys = ['1', '2', '3', '4', '5']
    // const values = [props.wins[0], props.wins[1], props.wins[2], props.wins[3], props.wins[4]]
    const values = [1, 3, 4, 3, 7]
    const data = keys.map((key, index) => {
        return {
            key: key,
            x: key,
            y: values[index]
        }
    })

    return (
        <View style={styles.container}>
            <VictoryPie
                colorScale={[colors.primary, colors.secondary, colors.tertiary, colors.quaternary, colors.quinary]}
                data={data}
                style={{labels: styles.victoryLabels}}
                theme={VictoryTheme.material} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 4
    },
    victoryLabels: {
        fill: colors.primary,
        fontFamily: 'Arvo-Bold',
        fontSize: 16
    }
})

export default WinChart
