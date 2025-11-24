import "./scss/app.scss"
import Home from "./pages/Home"
// import Cart from "./pages/Cart"
// import FullPizza from "./pages/FullPizza"
// import NotFound from "./pages/NotFound"
import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import { lazy, Suspense } from "react"

const Cart = lazy(() => import("./pages/Cart"))
const NotFound = lazy(() => import("./pages/NotFound"))
const FullPizza = lazy(() => import("./pages/FullPizza"))

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='cart'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
