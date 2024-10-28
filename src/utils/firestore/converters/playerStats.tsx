import PlayerStats from '../../../models/playerStats'

export const playerStatsConverter = {
    toFirestore: (playerStats) => {
        let ps: PlayerStats = {
            id: playerStats.id,
            currentStreak: playerStats.currentStreak,
            games: playerStats.games,
            maxStreak: playerStats.maxStreak,
            wins: playerStats.wins
        }
        return ps
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        let ps: PlayerStats = {
            id: data.id,
            currentStreak: data.currentStreak,
            games: data.games,
            maxStreak: data.maxStreak,
            wins: data.wins
        }
        return ps
    }
}
