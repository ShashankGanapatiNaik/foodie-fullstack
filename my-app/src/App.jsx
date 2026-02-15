import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

// pages
import Home from './pages/home/home'
import Cart from './pages/cart/cart'
import PlaceHolder from './pages/PlaceHolder/PlaceHolder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/loginPopup/LoginPopup'
import { useState } from 'react'
import Verify from './pages/verify/Verify'
import MyOrder from './pages/myOrders/MyOrder'
const App = () => {
  const [showLogin, setshowLogin] = useState(false)
  return (
    <>
      {showLogin ? <LoginPopup setshowLogin={setshowLogin} /> : <></>}
      <div className='app'>
        <Navbar setshowLogin={setshowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceHolder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrder />} />

        </Routes>
      </div >
      <Footer />
    </>

  )
}

export default App
