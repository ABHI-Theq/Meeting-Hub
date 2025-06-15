import './App.css'
import { Route, Routes } from 'react-router-dom'
import Room from './pages/Room'
import Header from './components/Header'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'

function App() {

  return (
    <>
            <Header/>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/room/:roomId" element={<Room/>}></Route>
      </Routes>
    </>
  )
}

export default App
