import React from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
