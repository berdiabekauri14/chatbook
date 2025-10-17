import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { PostProvider } from './context/Postcontext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <PostProvider>
                <App />
            </PostProvider>
        </AuthProvider>
    </BrowserRouter>
)
