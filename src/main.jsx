import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './AdminApp.jsx'

// Check if we are on the admin subdomain or admin path
const isAdminRoute = window.location.hostname.startsWith('admin') || window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? <AdminApp /> : <App />}
  </StrictMode>,
)
