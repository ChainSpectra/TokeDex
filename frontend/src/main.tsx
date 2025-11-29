import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppWithSplash } from './components/CrystalGenesisSplash'

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <AppWithSplash />
    </StrictMode>,
  );
}
