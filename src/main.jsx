
import './index.css';

import { createRoot } from 'react-dom/client';
import { ToastBar } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import App from './App';







createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    {/* <ToastBar position='top-center' reversOrder={false}/> */}
  </BrowserRouter>
  
)
