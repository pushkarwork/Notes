import React from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SingleNote from './components/SingleNote'

//IMPORTANT NOTE
//LOCALSTORAGE MEI TOKEN SET KAR DIYA EK BAR LOGIN KARKE AUR FIR IS TOKEN KO REDUX KI INITIAL STATE ME SET KER DIA
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/note/:_id' element={<SingleNote />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
