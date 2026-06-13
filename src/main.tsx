import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// StrictMode is intentionally omitted: its double-mount behavior conflicts with
// the WebGL context / postprocessing setup in @react-three/fiber.
createRoot(document.getElementById('root')!).render(<App />)
