import React, { useState } from "react"
import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound"
import { Route, Routes } from "react-router-dom"
function App() {
  const [searchPizza, setSearchPizza] = useState("")

  return (
    <>
      <div className='wrapper'>
        <Header searchPizza={searchPizza} setSearchPizza={setSearchPizza} />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home searchPizza={searchPizza} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
