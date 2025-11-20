// import React, { useState } from "react"

type CategoriesProps = {
  categoryID: number
  onChangeCategory: any
}

const Categories: React.FC<CategoriesProps> = ({
  onChangeCategory,
  categoryID,
}) => {
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

export default Categories
