import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Dashboard as AssetInventoryDashboard } from './pages/asset-inventory/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/asset-inventory" element={<AssetInventoryDashboard />} />
    </Routes>
  )
}

export default App
