import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import ThemeModeProvider from './theme/ThemeModeProvider';
import { AccentProvider } from './theme/AccentContext.tsx';
import {GoogleOAuthProvider} from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <AccentProvider>
        <ThemeModeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeModeProvider>
      </AccentProvider>
    </Provider>
  </GoogleOAuthProvider>
)

