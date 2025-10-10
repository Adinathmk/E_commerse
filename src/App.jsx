import { useState } from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'


function App() {
   return (
    <>

      <Routes>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
                
      </Routes>    
    </>
  )
}

export default App
