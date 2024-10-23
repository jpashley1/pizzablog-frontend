import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://pizzablog-frontend.onrender.com/";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
