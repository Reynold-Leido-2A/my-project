import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PriceChecker from './pages/PriceChecker'
import ApiPractice from './pages/ApiPractice'
import Navigation from './components/Navigation'
import './App.css'

function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <Navigation />
      <main className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 py-8 min-h-screen mt-24">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/price-checker" element={<PriceChecker />} />
          <Route path="/api-practice" element={<ApiPractice />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
