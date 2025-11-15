// import React, { useState } from "react"

export default function Categories({ onChangeCategory, categoryID }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Римские",
  ]

  return (
    <div className='categories'>
      <ul>
        {categories.map((cat, i) => {
          return (
            <li
              key={crypto.randomUUID()}
              onClick={() => onChangeCategory(i)}
              className={categoryID === i ? "active" : ""}>
              {cat}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
