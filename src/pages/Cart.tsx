import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../components/CartItem"
import { clearItems, selectCart } from "../redux/slices/cartSlice"
import CartEmpty from "../components/CartEmpty"

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const { totalPrice, items } = useSelector(selectCart)

  const onClickClear = () => {
    if (window.confirm("Уверен?")) {
      dispatch(clearItems())
    }
  }

  // const totalPrice = useSelector((state) => state.cart.totalPrice)
  const totalCount = items.reduce((acc: number, item: any) => {
    return acc + item.count
  }, 0)
  if (!totalPrice) {
    return <CartEmpty />
  }
  return (
    <div className='container container--cart'>
      <div className='cart'>
        <div className='cart__top'>
          <h2 className='content__title'>
            <img src='/img/cart.svg' alt='' /> Корзина
          </h2>
          <div onClick={onClickClear} className='cart__clear'>
            <img src='/img/trash.svg' alt='' />
            <span>Очистить корзину</span>
          </div>
        </div>
        {items.map((item: any) => (
          <CartItem key={item.id} {...item} />
        ))}
        <div className='cart__bottom'>
          <div className='cart__bottom-details'>
            <span>
              Всего пицц: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>{" "}
            </span>
          </div>
          <div className='cart__bottom-buttons'>
            <Link
              to='/'
              className='button button--outline button--add go-back-btn'>
              <img src='/img/grey-arrow-left.svg' alt='' />
              <span>Вернуться назад</span>
            </Link>
            <div className='button pay-btn'>
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
