import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Room from './pages/Room'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/room/:roomId" element={<Room/>}></Route>
      </Routes>
    </>
  )
}

export default App
