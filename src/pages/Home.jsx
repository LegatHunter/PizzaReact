import React, { useState, useEffect, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { setCategoryID } from "../redux/slices/filterSlice"
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagination"
import { AppContext } from "../App"

export default function Home() {
  const dispatch = useDispatch()
  const { categoryID, sort } = useSelector((state) => state.filter)

  const onChangeCategory = (id) => {
    dispatch(setCategoryID(id))
  }
  const { searchPizza } = useContext(AppContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    const sortBy = sort.sortProp.replace("-", "")
    const order = sort.sortProp.includes("-") ? "asc" : "desc"
    const category = categoryID > 0 ? `category=${categoryID}` : ""
    const search = searchPizza ? `&search=${searchPizza}` : ""
    axios
      .get(
        `https://6914dcc43746c71fe049df36.mockapi.io/Pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryID, sort.sortProp, searchPizza, currentPage])

  const pizzas = items
    // ФИЛЬТРАЦЦИЯ НА СТОРОНЕ ФРОНТА
    // .filter((el) => {
    //   if (el.title.toLowerCase().includes(searchPizza.toLowerCase())) {
    //     return true
    //   }
    //   return false
    // })
    .map((el) => <PizzaBlock key={crypto.randomUUID()} {...el} />)

  const skeletons = [...new Array(items.length)].map((_, i) => (
    <Skeleton key={i} />
  ))
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoryID={categoryID}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading ? skeletons : pizzas}
        {/* {items.map((el) =>
                isLoading ? (
                  <Skeleton />
                ) : (
                  <PizzaBlock key={crypto.randomUUID()} {...el} />
                )
              )} */}
      </div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  )
}
