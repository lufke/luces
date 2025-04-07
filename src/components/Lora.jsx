import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos
  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://192.168.1.48:2700/dht11/quincho/latest');

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }
const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      setError(`No se pudo obtener los datos: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

// useEffect para ejecutar getData al cargar el componente
  useEffect(() => {
    console.log('useEffect ejecutado');
    getData();
    console.log('Después de ejecutar useEffect');
  }, []);

return (
    <div>
      <h3>DHT11</h3>

      {loading && <p>Cargando datos...</p>}
      {error && <p>{error}</p>}

      {data && (
        <div>
          <p>🌡️ {data.temperatura}° - 💧 {data.humedad} %</p>

<p>🗓️ {new Date(data.fecha_recepcion).toLocaleDateString('es-CL')}</p>
<p>⌚ {new Date(data.fecha_recepcion).toLocaleTimeString('es-CL')} </p>
<p>📡 {data.equipo}</p>
</div>
      )}

</div>
  );
}
export default App;
