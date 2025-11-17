import React, { useState, createContext } from "react"
import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound"
import { Route, Routes } from "react-router-dom"

export const AppContext = createContext("")

function App() {
  const [searchPizza, setSearchPizza] = useState("")

  return (
    <AppContext.Provider value={{ searchPizza, setSearchPizza }}>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home value={searchPizza} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
