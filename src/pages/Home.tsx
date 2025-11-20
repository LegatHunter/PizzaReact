import { useEffect, useRef, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

import qs from "qs"
import { Link, useNavigate } from "react-router-dom"
import {
  setCategoryID,
  setPageCount,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice"
import Categories from "../components/Categories"
import Sort, { list } from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagination"
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMounted = useRef(false)

  const { items, status } = useSelector(selectPizzaData)
  const { categoryID, sort, pageCount, searchValue } = useSelector(selectFilter)

  const onChangeCategory = useCallback(
    (idx: number) => {
      dispatch(setCategoryID(idx))
    },
    [dispatch]
  )

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProp.replace("-", "")
    const order = sort.sortProp.includes("-") ? "asc" : "desc"
    const category = categoryID > 0 ? `category=${categoryID}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        pageCount,
      })
    )
    window.scrollTo(0, 0)
  }

  // Сохраняем параметры в URL при изменении
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sort.sortProp,
        categoryID,
        pageCount,
      })
      navigate(`/?${queryString}`)
    }
    isMounted.current = true
  }, [categoryID, sort.sortProp, pageCount, navigate])

  // Парcим параметры из URL при первом рендере
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
    getPizzas()
  }, [categoryID, sort.sortProp, searchValue, pageCount])

  const pizza = items.map((el: any) => (
    <Link to={`/pizza/${el.id}`} key={el.id}>
      <PizzaBlock {...el} />
    </Link>
  ))

  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />)

  const isLoading = status === "loading"
  const isError = status === "error"

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
      {isError && (
        <div className='content__error'>Ошибка при загрузке пицц</div>
      )}
      <div className='content__items'>{isLoading ? skeletons : pizza}</div>
      <Pagination value={pageCount} onPageChange={onChangePage} />
    </div>
  )
}
export default Home
