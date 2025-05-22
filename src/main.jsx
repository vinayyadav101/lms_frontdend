
import './index.css';

import { createRoot } from 'react-dom/client';
import {  Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './redux/storege/store';







createRoot(document.getElementById('root')).render(
    <Provider store={store}> 
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  
)
