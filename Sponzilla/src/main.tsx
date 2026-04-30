import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

// Silence non-critical logs in production
if (import.meta.env.PROD) {
  console.log = () => {};
  console.debug = () => {};
  console.warn = () => {};
  // console.error is kept active so you can still debug production crashes
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
