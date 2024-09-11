import { ListaLuces } from '../components/ListaLuces'
import { DHT11 } from '../components/DHT11'
import { tasmotaContext } from '../contexts/tasmotaContext'
import { useContext } from 'react'

export const HomePage = () => {

    const { clienteMQTT } = useContext(tasmotaContext)
    console.log(clienteMQTT)
    return (
        <div>
            {!clienteMQTT?.connected
                ? <h1>OFFLINE</h1>
                : <>
                    <DHT11 />
                    <ListaLuces />
                </>
            }
        </div>
    )
}
