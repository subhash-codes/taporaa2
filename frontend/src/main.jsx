import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ServiceContextProvider from './components/Context/ServiceContext.jsx'
ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceContextProvider>
        <App />
      </ServiceContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
