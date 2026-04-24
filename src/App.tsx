import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Dashboard as AssetInventoryDashboard } from './pages/asset-inventory/Dashboard'
import { AssetDetailsPage } from './pages/asset-inventory/AssetDetailsPage'

import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/asset-inventory" element={<AssetInventoryDashboard />} />
        <Route path="/asset-inventory/:assetId" element={<AssetDetailsPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
