import { useContext } from 'react'
import { tasmotaContext } from '../contexts/tasmotaContext'

export const ListaLuces = () => {

    const { clienteMQTT, tasmotasList = [], knilStats = {} } = useContext(tasmotaContext)
    console.log(tasmotasList)
    const visibles = tasmotasList.filter(item => item.ip)

    const ListItem = ({ item }) => {

        return (
            <li>
                {/* {JSON.stringify(item)} */}
                {item.nombre}
                <button onClick={() => clienteMQTT.publish(`cmnd/${item.equipo}/POWER`, 'TOGGLE')} >{item.estado}</button>
            </li>
        )
    }
    return (
        <ul>
            {visibles.map(item => {
                return (
                    <ListItem key={item.ip} item={item} />
                )
            })}
        </ul>
    )
}
