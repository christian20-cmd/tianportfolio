// src/App.jsx
import { Routes, Route } from "react-router-dom"
import CustomCursor from "./components/layout/CustomCursor"
import Portfolio from "./pages/Portfolio"
import AdminApp from "./pages/admin/AdminApp"

function App() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
  )
}

export default App