import React, { useState, useEffect, useContext, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import qs from "qs"
import { useNavigate } from "react-router-dom"
import {
  setCategoryID,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice"
import Categories from "../components/Categories"
import Sort, { list } from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagination"
import { AppContext } from "../App"

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const { categoryID, sort, pageCount } = useSelector((state) => state.filter)
  const { searchPizza } = useContext(AppContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onChangeCategory = (id) => {
    dispatch(setCategoryID(id))
  }

  const onChangePage = (number) => {
    dispatch(setPageCount(number))
  }

  const fetchPizzas = () => {
    setIsLoading(true)
    const sortBy = sort.sortProp.replace("-", "")
    const order = sort.sortProp.includes("-") ? "asc" : "desc"
    const category = categoryID > 0 ? `category=${categoryID}` : ""
    const search = searchPizza ? `&search=${searchPizza}` : ""
    axios
      .get(
        `https://6914dcc43746c71fe049df36.mockapi.io/Pizza?page=${pageCount}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })
  }
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find((obj) => obj.sortProp === params.sortProp)
      dispatch(setFilters({ ...params, sort }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
  }, [categoryID, sort.sortProp, searchPizza, pageCount])

  useEffect(() => {
    const queryString = qs.stringify({
      sortProp: sort.sortProp,
      categoryID,
      pageCount,
    })
    navigate(`?${queryString}`)
  }, [categoryID, sort.sortProp, searchPizza, pageCount])

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
      <Pagination value={pageCount} onPageChange={onChangePage} />
    </div>
  )
}
