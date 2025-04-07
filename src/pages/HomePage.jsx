import { ListaLuces } from '../components/ListaLuces'
import { DHT11 } from '../components/DHT11'
import { tasmotaContext } from '../contexts/tasmotaContext'
import { useContext } from 'react'
import Lora from '../components/Lora' 

export const HomePage = () => {

	const { clienteMQTT, knilStats } = useContext(tasmotaContext)
	return (
		<div>
			<div style={{display:'flex', justifyContent:'space-between', gap: '20px'}}>
				{!clienteMQTT?.connected
					? <h1>OFFLINE</h1>
					: <>
						{knilStats.temp && <DHT11 />}
						<Lora />
					</>
				}
			</div>
			<ListaLuces/>
		</div>
	)
}
