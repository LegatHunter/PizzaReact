// import React, { useState } from "react"

export default function Categories({ activeIndex, setActiveIndex }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ]
  return (
    <div className='categories'>
      <ul>
        {categories.map((cat, i) => {
          return (
            <li
              key={crypto.randomUUID()}
              onClick={() => setActiveIndex(i)}
              className={activeIndex === i ? "active" : ""}>
              {cat}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
