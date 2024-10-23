import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './home-component/App.jsx'
import './output.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
)
