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
