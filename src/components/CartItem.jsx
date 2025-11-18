import { useDispatch } from "react-redux"
import { addItem, minusItem, removeItem } from "../redux/slices/cartSlice"

export default function CartItem({
  id,
  title,
  types,
  price,
  count,
  imageUrl,
  size,
}) {
  const dispatch = useDispatch()
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      })
    )
  }
  const onClickMinus = () => {
    dispatch(minusItem(id))
  }
  const onClickRemove = () => {
    if (window.confirm("Уверен?")) {
      dispatch(removeItem(id))
    }
  }
  return (
    <div className='content__items'>
      <div className='cart__item'>
        <div className='cart__item-img'>
          <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        </div>
        <div className='cart__item-info'>
          <h3>{title}</h3>
          <p>
            {types}, {size} см.
          </p>
        </div>
        <div className='cart__item-count'>
          <div
            onClick={onClickMinus}
            className='button button--outline button--circle cart__item-count-minus'>
            <img src='/img/plus.svg' alt='' />
          </div>
          <b>{count}</b>
          <div
            onClick={onClickPlus}
            className='button button--outline button--circle cart__item-count-plus'>
            <img src='/img/plus.svg' alt='' />
          </div>
        </div>
        <div className='cart__item-price'>
          <b>{price * count} ₽</b>
        </div>
        <div className='cart__item-remove'>
          <div
            onClick={onClickRemove}
            className='button button--outline button--circle'>
            <img src='/img/plus.svg' alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}
