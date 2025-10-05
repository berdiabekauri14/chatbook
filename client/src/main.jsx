import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostProvider } from './context/Postcontext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <PostProvider>
                <App />
            </PostProvider>
        </AuthProvider>
    </BrowserRouter>
)
