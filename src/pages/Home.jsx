import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react"
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
  const isMounted = useRef(false)

  const { categoryID, sort, pageCount } = useSelector((state) => state.filter)
  const { searchPizza } = useContext(AppContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onChangeCategory = useCallback(
    (idx) => {
      dispatch(setCategoryID(idx))
    },
    [dispatch]
  )

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
      .catch((error) => {
        console.error("Ошибка загрузки пицц:", error)
        setIsLoading(false)
      })
  }

  // Сохраняем параметры в URL при изменении
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sort.sortProp,
        categoryID,
        pageCount,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryID, sort.sortProp, pageCount, navigate])

  // Парсим параметры из URL при первом рендере
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sortObj = list.find((obj) => obj.sortProp === params.sortProp)
      dispatch(
        setFilters({
          ...params,
          sort: sortObj,
          categoryID: Number(params.categoryID),
          pageCount: Number(params.pageCount),
        })
      )
    }
  }, [dispatch])

  // Загружаем пиццы при изменении параметров
  useEffect(() => {
    window.scrollTo(0, 0)
    fetchPizzas()
  }, [categoryID, sort.sortProp, searchPizza, pageCount])

  const pizzas = items.map((el) => (
    <PizzaBlock key={el.id || crypto.randomUUID()} {...el} />
  ))

  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />)

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
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination value={pageCount} onPageChange={onChangePage} />
    </div>
  )
}
