
import './index.css';

import { createRoot } from 'react-dom/client';
import { ToastBar } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './redux/storege/store';







createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}> 
        <App />
    </Provider>
    {/* <ToastBar position='top-center' reversOrder={false}/> */}
  </BrowserRouter>
  
)
