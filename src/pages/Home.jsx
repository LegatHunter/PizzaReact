import React, { useState, useEffect } from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"

export default function Home() {
  const [items, setItems] = useState([])
  const [isloading, setIsloading] = useState(true)
  const API = "https://6914dcc43746c71fe049df36.mockapi.io/Pizza"
  useEffect(() => {
    fetch(API)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setItems(json)
        setIsloading(false)
      })
  }, [])
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isloading
          ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
          : items.map((el) => <PizzaBlock key={crypto.randomUUID()} {...el} />)}
        {/* {items.map((el) =>
                isloading ? (
                  <Skeleton />
                ) : (
                  <PizzaBlock key={crypto.randomUUID()} {...el} />
                )
              )} */}
      </div>
    </>
  )
}
