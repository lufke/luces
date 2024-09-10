// import { createContext, useState, useEffect } from "react";
// import MQTT from "mqtt";

// export const tasmotaContext = createContext(null)

// export const MQTTProvider = ({ children, host, port }) => {
//     const [isConnected, setIsConnected] = useState(false)
//     const [knilStats, setKnilStats] = useState({})
//     const [knilAlert, setKnilAlert] = useState({})
//     const [clienteMQTT, setClienteMQTT] = useState(null)

//     const [tasmotasList, setTasmotasList] = useState([])
//     const topicsSubcribed = ['knil/#', 'tele/#', 'tasmota/discovery/+/config', 'stat/#']

//     useEffect(() => {
//         const client = MQTT.connect({ host, port, protocol: 'ws' });
//         setClienteMQTT(client)

//         client.on('connect', () => {
//             setIsConnected(true);
//             topicsSubcribed.forEach(item => client.subscribe(item))
//             client.publish(`cmnd/tasmotas/POWER`, '')
//         });

//         client.on('message', (topic, message) => {
//             const mensaje = message.toString();
//             const topico = topic.split('/');

//             if (topico[0] === 'knil') {
//                 const data = JSON.parse(mensaje);
//                 if (topico[1] === 'dht11')
//                     setKnilStats(data);
//                 if (topico[1] === 'alerta') {
//                     setKnilAlert(data);
//                 }
//             }

//             if (topico[0] === "tele") {

//                 if (topico[2] == "LWT") {
//                     // client.publish(`cmnd/${topico[1]}/POWER`, '')
//                     setTasmotasList(prevDeviceList => {
//                         const index = prevDeviceList.findIndex(dato => dato.equipo === topico[1]);
//                         if (index !== -1) {
//                             return prevDeviceList.map((dato, i) =>
//                                 i === index ? { ...dato, equipo: topico[1], conexion: mensaje } : dato
//                             );
//                         } else {
//                             return [...prevDeviceList, { equipo: topico[1], conexion: mensaje }];
//                         }
//                     })
//                 }

//                 if (topico[2] == "STATE") {
//                     const data = JSON.parse(mensaje);
//                     setTasmotasList(prevDeviceList => {
//                         const index = prevDeviceList.findIndex(dato => dato.equipo === topico[1]);
//                         if (index !== -1) {
//                             return prevDeviceList.map((dato, i) =>
//                                 i === index ? { ...dato, equipo: topico[1], wifi: data.Wifi, estado: data.POWER } : dato
//                             );
//                         } else {
//                             return [...prevDeviceList, { ...dato, equipo: topico[1], wifi: data.Wifi, estado: data.POWER }];
//                         }
//                     })
//                 }
//             }

//             if (topico[1] === 'discovery') {
//                 const data = JSON.parse(mensaje)
//                 if (topico[3] === 'config') {
//                     setTasmotasList(prevDeviceList => {
//                         const index = prevDeviceList.findIndex(dato => dato.equipo === data.t);
//                         if (index !== -1) {
//                             return prevDeviceList.map((dato, i) =>
//                                 i === index ? { ...dato, equipo: data.t, nombre: data.fn[0], ip: data.ip, mac: data.mac } : dato
//                             );
//                         } else {
//                             return [...prevDeviceList, { ...dato, equipo: data.t, nombre: data.fn[0], ip: data.ip }];
//                         }
//                     })
//                 }
//             }

//             if (topico[0] === "stat") {
//                 if (topico[2] === "POWER") {
//                     setTasmotasList(prevDeviceList => {
//                         const index = prevDeviceList.findIndex(dato => dato.equipo === topico[1]);
//                         if (index !== -1) {
//                             return prevDeviceList.map((dato, i) =>
//                                 i === index ? { ...dato, equipo: topico[1], estado: mensaje } : dato
//                             );
//                         } else {
//                             return [...prevDeviceList, { equipo: topico[1], estado: mensaje }];
//                         }
//                     })
//                 }

//             }
//         });

//         return () => {
//             client.end();
//         };
//     }, []);

//     return (
//         <tasmotaContext.Provider
//             value={{
//                 clienteMQTT,
//                 knilStats,
//                 knilAlert,
//                 tasmotasList,
//                 isConnected
//             }}>
//             {children}
//         </tasmotaContext.Provider>
//     )
// }



import { createContext, useState, useEffect } from "react";
import MQTT from "mqtt";

export const tasmotaContext = createContext(null);

export const MQTTProvider = ({ children, host, port }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [knilStats, setKnilStats] = useState({});
    const [knilAlert, setKnilAlert] = useState({});
    const [clienteMQTT, setClienteMQTT] = useState(null);

    const [tasmotasList, setTasmotasList] = useState([]);
    const topicsSubcribed = ['knil/#', 'tele/#', 'tasmota/discovery/+/config', 'stat/#'];

    useEffect(() => {
        const client = MQTT.connect({ host, port, protocol: 'ws' });
        setClienteMQTT(client);

        client.on('connect', () => {
            setIsConnected(true);
            topicsSubcribed.forEach(item => client.subscribe(item));
            client.publish('cmnd/tasmotas/POWER', '');
        });

        client.on('message', (topic, message) => {
            const mensaje = message.toString();
            const topico = topic.split('/');

            // Manejo de topics knil (dht11 y alertas)
            if (topico[0] === 'knil') {
                const data = JSON.parse(mensaje);
                if (topico[1] === 'dht11') setKnilStats(data);
                if (topico[1] === 'alerta') setKnilAlert(data);
            }

            // Manejo de topics tele (conexión y estado)
            if (topico[0] === 'tele') {
                const equipo = topico[1];
                if (topico[2] === 'LWT') {
                    setTasmotasList(prevList => {
                        const index = prevList.findIndex(dato => dato.equipo === equipo);
                        if (index !== -1) {
                            return prevList.map((dato, i) =>
                                i === index ? { ...dato, conexion: mensaje } : dato
                            );
                        } else {
                            return [...prevList, { equipo, conexion: mensaje }];
                        }
                    });
                }

                if (topico[2] === 'STATE') {
                    const data = JSON.parse(mensaje);
                    setTasmotasList(prevList => {
                        const index = prevList.findIndex(dato => dato.equipo === equipo);
                        if (index !== -1) {
                            return prevList.map((dato, i) =>
                                i === index ? { ...dato, wifi: data.Wifi, estado: data.POWER } : dato
                            );
                        } else {
                            return [...prevList, { equipo, wifi: data.Wifi, estado: data.POWER }];
                        }
                    });
                }
            }

            // Manejo de topics de descubrimiento
            if (topico[0] === 'tasmota' && topico[3] === 'config') {
                const data = JSON.parse(mensaje);
                const equipo = data.t;
                setTasmotasList(prevList => {
                    const index = prevList.findIndex(dato => dato.equipo === equipo);
                    if (index !== -1) {
                        return prevList.map((dato, i) =>
                            i === index ? { ...dato, nombre: data.fn[0], ip: data.ip, mac: data.mac } : dato
                        );
                    } else {
                        return [...prevList, { equipo, nombre: data.fn[0], ip: data.ip, mac: data.mac }];
                    }
                });
            }

            // Manejo de topics de estado (stat)
            if (topico[0] === 'stat' && topico[2] === 'POWER') {
                const equipo = topico[1];
                setTasmotasList(prevList => {
                    const index = prevList.findIndex(dato => dato.equipo === equipo);
                    if (index !== -1) {
                        return prevList.map((dato, i) =>
                            i === index ? { ...dato, estado: mensaje } : dato
                        );
                    } else {
                        return [...prevList, { equipo, estado: mensaje }];
                    }
                });
            }
        });

        return () => {
            client.end();
        };
    }, [host, port]);

    return (
        <tasmotaContext.Provider value={{
            clienteMQTT,
            knilStats,
            knilAlert,
            tasmotasList,
            isConnected
        }}>
            {children}
        </tasmotaContext.Provider>
    );
};
