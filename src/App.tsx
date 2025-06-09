// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}> 
          <Route index element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}
