import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './home-component/App.jsx'


// createRoot(document.getElementById('root')).render(
//     <BrowserRouter>
//        <Provider 
//        store={store}>
//         <App></App>
//        </Provider>
//     </BrowserRouter>
// )


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root'. Verifica tu HTML.");
}

// ⚡️ TypeScript necesita que rootElement sea de tipo HTMLDivElement
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);