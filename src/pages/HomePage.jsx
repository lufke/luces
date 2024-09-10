import { ListaLuces } from '../components/ListaLuces'
import { DHT11 } from '../components/DHT11'

export const HomePage = () => {
    return (
        <>
            <DHT11 />
            <ListaLuces />
        </>
    )
}
