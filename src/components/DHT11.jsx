import { useContext } from 'react'
import { tasmotaContext } from '../contexts/tasmotaContext'

export const DHT11 = () => {
    const { knilStats } = useContext(tasmotaContext)

    return (
        <>
            <h1>🌡️ {knilStats.temp}° - 💧 {knilStats.hum}%</h1>
            <h2>⌛ {knilStats.dt}</h2>
        </>
    )
}
