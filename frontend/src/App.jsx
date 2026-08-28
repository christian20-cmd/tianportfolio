// src/App.jsx
import { Routes, Route } from "react-router-dom"
import Portfolio from "./pages/Portfolio"
import AdminApp from "./pages/admin/AdminApp"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
  )
}

export default App