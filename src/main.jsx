import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './AdminApp.jsx'

// Check if we are on the admin subdomain, admin path, or using admin hash (best for GitHub Pages)
const isAdminRoute = window.location.hostname.startsWith('admin') || 
                     window.location.pathname.endsWith('/admin') || 
                     window.location.pathname.includes('/admin/') ||
                     window.location.hash === '#admin' ||
                     window.location.hash.startsWith('#/admin');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? <AdminApp /> : <App />}
  </StrictMode>,
)
