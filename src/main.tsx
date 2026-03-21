import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import ThemeModeProvider from './theme/ThemeModeProvider';
import { AccentProvider } from './theme/AccentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AccentProvider>
      <ThemeModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeModeProvider>
    </AccentProvider>
  </Provider>,
)

