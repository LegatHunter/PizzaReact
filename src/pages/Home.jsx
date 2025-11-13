import React, { useState, useEffect } from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"

export default function Home() {
  const [items, setItems] = useState([])
  const [isloading, setIsloading] = useState(true)
  const [categoryActiveIndex, setCategoryActiveIndex] = useState(0)
  const [activeSort, setActiveSort] = useState({
    name: "популярности",
    sortProp: "rating",
  })

  useEffect(() => {
    setIsloading(true)
    const sortBy = activeSort.sortProp.replace("-", "")
    const order = activeSort.sortProp.includes("-") ? "asc" : "desc"

    fetch(
      `https://6914dcc43746c71fe049df36.mockapi.io/Pizza?${
        categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : ""
      }&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setItems(json)
        setIsloading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryActiveIndex, activeSort])
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
        {isloading
          ? [...new Array(items.length)].map((_, i) => <Skeleton key={i} />)
          : items.map((el) => <PizzaBlock key={crypto.randomUUID()} {...el} />)}
        {/* {items.map((el) =>
                isloading ? (
                  <Skeleton />
                ) : (
                  <PizzaBlock key={crypto.randomUUID()} {...el} />
                )
              )} */}
      </div>
    </div>
  )
}
