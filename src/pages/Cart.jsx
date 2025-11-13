import { Link } from "react-router-dom"

export default function Cart() {
  return (
    <div className='container container--cart'>
      <div class='cart'>
        <div class='cart__top'>
          <h2 class='content__title'>
            <img src='/img/cart.svg' alt='' /> Корзина
          </h2>
          <div class='cart__clear'>
            <img src='/img/trash.svg' alt='' />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div class='content__items'>
          <div class='cart__item'>
            <div class='cart__item-img'>
              <img
                class='pizza-block__image'
                src='https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif'
                alt='Pizza'
              />
            </div>
            <div class='cart__item-info'>
              <h3>Сырный цыпленок</h3>
              <p>тонкое тесто, 26 см.</p>
            </div>
            <div class='cart__item-count'>
              <div class='button button--outline button--circle cart__item-count-minus'>
                <img src='/img/plus.svg' alt='' />
              </div>
              <b>2</b>
              <div class='button button--outline button--circle cart__item-count-plus'>
                <img src='/img/plus.svg' alt='' />
              </div>
            </div>
            <div class='cart__item-price'>
              <b>770 ₽</b>
            </div>
            <div class='cart__item-remove'>
              <div class='button button--outline button--circle'>
                <img src='/img/plus.svg' alt='' />
              </div>
            </div>
          </div>
        </div>
        <div class='content__items'>
          <div class='cart__item'>
            <div class='cart__item-img'>
              <img
                class='pizza-block__image'
                src='https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif'
                alt='Pizza'
              />
            </div>
            <div class='cart__item-info'>
              <h3>Сырный цыпленок</h3>
              <p>тонкое тесто, 26 см.</p>
            </div>
            <div class='cart__item-count'>
              <div class='button button--outline button--circle cart__item-count-minus'>
                <img src='/img/plus.svg' alt='' />
              </div>
              <b>2</b>
              <div class='button button--outline button--circle cart__item-count-plus'>
                <img src='/img/plus.svg' alt='' />
              </div>
            </div>
            <div class='cart__item-price'>
              <b>770 ₽</b>
            </div>
            <div class='cart__item-remove'>
              <div class='button button--outline button--circle'>
                <img src='/img/plus.svg' alt='' />
              </div>
            </div>
          </div>
        </div>
        <div class='content__items'>
          <div class='cart__item'>
            <div class='cart__item-img'>
              <img
                class='pizza-block__image'
                src='https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif'
                alt='Pizza'
              />
            </div>
            <div class='cart__item-info'>
              <h3>Сырный цыпленок</h3>
              <p>тонкое тесто, 26 см.</p>
            </div>
            <div class='cart__item-count'>
              <div class='button button--outline button--circle cart__item-count-minus'>
                <img src='/img/plus.svg' alt='' />
              </div>
              <b>2</b>
              <div class='button button--outline button--circle cart__item-count-plus'>
                <img src='/img/plus.svg' alt='' />
              </div>
            </div>
            <div class='cart__item-price'>
              <b>770 ₽</b>
            </div>
            <div class='cart__item-remove'>
              <div class='button button--outline button--circle'>
                <img src='/img/plus.svg' alt='' />
              </div>
            </div>
          </div>
        </div>
        <div class='cart__bottom'>
          <div class='cart__bottom-details'>
            <span>
              Всего пицц: <b>3 шт.</b>{" "}
            </span>
            <span>
              Сумма заказа: <b>900 ₽</b>{" "}
            </span>
          </div>
          <div class='cart__bottom-buttons'>
            <Link to='/' class='button button--outline button--add go-back-btn'>
              <img src='/img/grey-arrow-left.svg' alt='' />
              <span>Вернуться назад</span>
            </Link>
            <div class='button pay-btn'>
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
