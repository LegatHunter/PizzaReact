// import React, { useState } from "react"

type CategoriesProps = {
  categoryID: number
  onChangeCategory: (i: number) => void
}
const categories = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Римские",
]
const Categories: React.FC<CategoriesProps> = ({
  onChangeCategory,
  categoryID,
}) => {
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

export default Categories
