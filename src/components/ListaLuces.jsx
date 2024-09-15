import { useContext } from 'react'
import { tasmotaContext } from '../contexts/tasmotaContext'
import { Button, FormControlLabel, FormGroup, Stack, Switch } from '@mui/material'

export const ListaLuces = () => {

    const { clienteMQTT, tasmotasList = [] } = useContext(tasmotaContext)
    const visibles = tasmotasList.filter(item => item.ip)

    const ListSwitchItem = ({ item }) => {
        const toggleLight = () => clienteMQTT.publish(`cmnd/${item.equipo}/POWER`, 'TOGGLE')
        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={item.estado === 'ON'}
                        onChange={toggleLight}
                    />
                }
                label={item.nombre}
            />
        )
    }


    const ListItem = ({ item }) => {

        const toggleLight = () => clienteMQTT.publish(`cmnd/${item.equipo}/POWER`, 'TOGGLE')

        return (
            <Button
                variant='contained'
                onClick={() => toggleLight(item)}
            >
                {item.nombre} - {item.estado}
            </Button>
        )
    }

    return (
        // <Stack
        //     spacing={2}
        //     direction={'column'}
        // >
        //     {visibles.map(item => {
        //         return (
        //             // <ListItem key={item.ip} item={item} />
        //             <ListSwitchItem key={item.ip} item={item} />
        //         )
        //     })}
        // </Stack>

        <FormGroup>
            {visibles.map(item => {
                return (
                    <ListSwitchItem key={item.ip} item={item} />
                )
            })}
        </FormGroup>
    )
}
