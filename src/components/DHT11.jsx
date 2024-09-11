import { useContext } from 'react'
import { tasmotaContext } from '../contexts/tasmotaContext'

export const DHT11 = () => {
    const { knilStats } = useContext(tasmotaContext)

    const lolo = new Date(knilStats.dt)
    console.log(lolo)

    return (
        <>
            <h2>🌡️ {knilStats.temp}° - 💧 {knilStats.hum}%</h2>
            <h3>📅 {lolo.toLocaleDateString('en-US')}</h3>
            <h3>⌚ {lolo.toLocaleTimeString('en-US')}</h3>
        </>
    )
}
