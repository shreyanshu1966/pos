import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LoginPage from './components/LoginPage'
import POSScreen from './components/POSScreen'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setSelectedCompany(null)
  }

  return (
    <Router>
      <div className="min-h-screen bg-sage-bg">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/pos" replace />
              )
            } 
          />
          <Route 
            path="/pos" 
            element={
              isAuthenticated ? (
                <POSScreen 
                  selectedCompany={selectedCompany}
                  setSelectedCompany={setSelectedCompany}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
