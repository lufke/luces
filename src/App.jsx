// import { useState } from 'react'
// import mqtt from 'mqtt'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// const clientMqtt = mqtt.connect(
//   {
//     host: '192.168.1.48',
//     port: 9001
//   }
// )

// clientMqtt.subscribe([
//   'knil/alerta'
// ])

// // clientMqtt.

// function App() {
//   const [count, setCount] = useState(0)
//   const [mensaje, setMensaje] = useState({})



//   clientMqtt.on('message', (topic, message) => {
//     console.log(topic, message.toString())
//     setMensaje(message)
//   })

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>{mensaje?.tipo}</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// src/App.jsx
import React from 'react';
import { MQTTProvider } from './contexts/tasmotaContext.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

const App = () => {
  return (
    <MQTTProvider host={'192.168.1.48'} port={9001}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </MQTTProvider>
  );
};

export default App;
