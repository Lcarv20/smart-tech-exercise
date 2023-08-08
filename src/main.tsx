import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./globals.css"
import ApplicationWrappers from './ApplicationWrappers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApplicationWrappers>
    <App />
  </ApplicationWrappers>
)
