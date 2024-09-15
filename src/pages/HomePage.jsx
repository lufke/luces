import { ListaLuces } from '../components/ListaLuces'
import { DHT11 } from '../components/DHT11'
import { tasmotaContext } from '../contexts/tasmotaContext'
import { useContext } from 'react'

export const HomePage = () => {

    const { clienteMQTT, knilStats } = useContext(tasmotaContext)
    return (
        <div>
            {!clienteMQTT?.connected
                ? <h1>OFFLINE</h1>
                : <>
                    {knilStats.temp && <DHT11 />}
                    <ListaLuces />
                </>
            }
        </div>
    )
}
