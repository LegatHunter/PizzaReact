import React, { useState, useEffect, useContext } from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagination"
import { AppContext } from "../App"

export default function Home() {
  const { searchPizza } = useContext(AppContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryActiveIndex, setCategoryActiveIndex] = useState(0)
  const [activeSort, setActiveSort] = useState({
    name: "популярности",
    sortProp: "rating",
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    const sortBy = activeSort.sortProp.replace("-", "")
    const order = activeSort.sortProp.includes("-") ? "asc" : "desc"
    const category =
      categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : ""
    const search = searchPizza ? `&search=${searchPizza}` : ""

    fetch(
      `https://6914dcc43746c71fe049df36.mockapi.io/Pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setItems(json)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryActiveIndex, activeSort, searchPizza, currentPage])

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
          activeIndex={categoryActiveIndex}
          setActiveIndex={setCategoryActiveIndex}
        />
        <Sort activeSort={activeSort} setActiveSort={(i) => setActiveSort(i)} />
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
