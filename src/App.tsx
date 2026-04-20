import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Dashboard as AssetInventoryDashboard } from './pages/asset-inventory/Dashboard'

import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/asset-inventory" element={<AssetInventoryDashboard />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
