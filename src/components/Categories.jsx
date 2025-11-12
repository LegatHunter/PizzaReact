import React, { useState } from "react"

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0)

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
              key={i}
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
