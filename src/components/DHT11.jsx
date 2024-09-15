import { useContext } from 'react'
import { tasmotaContext } from '../contexts/tasmotaContext'

export const DHT11 = () => {
    const { knilStats } = useContext(tasmotaContext)
    const dateTime = knilStats?.dt?.split(', ')
    return (
        <>
            <h3>🌡️ {knilStats.temp}° - 💧 {knilStats.hum}%</h3>
            <h3>📅 {dateTime[0]}</h3>
            <h3>⌚ {dateTime[1]}</h3>
        </>
    )
}