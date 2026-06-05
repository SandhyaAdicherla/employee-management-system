import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './Context/ToastContext.jsx'
import { AuthProvider } from './Context/Authcontext.jsx'
import "./styles/variables.css";
import "./styles/common.css";
import "./styles/forms.css";
import "./styles/buttons.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
