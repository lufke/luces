import { useContext } from 'react'
import { tasmotaContext } from '../contexts/tasmotaContext'

export const DHT11 = () => {
    const { knilStats } = useContext(tasmotaContext)

    // Verificación segura de la fecha y hora
    const dateTime = knilStats?.dt?.split(', ') || [];

    return (
        <div>
		<h3>Raspi</h3>
            <p>🌡️ {knilStats?.temp}° - 💧 {knilStats?.hum}%</p>
            {dateTime.length === 2 && (
                <>
                    <p>📅 {dateTime[0]}</p>
                    <p>⌚ {dateTime[1]}</p>
                    {/* Aquí puedes agregar cualquier otro valor que necesites */}
                    <p>📡 Bodega </p> {/* Ejemplo de cómo agregar un campo 'bodega' */}
                </>
            )}
            {/* En caso de que no haya fecha y hora disponibles */}
            {dateTime.length !== 2 && <h3>📅 y ⌚ no disponibles</h3>}
        </div>
    )
}
