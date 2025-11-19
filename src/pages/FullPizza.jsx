import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function FullPizza() {
  const [pizza, setPizza] = useState()
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6914dcc43746c71fe049df36.mockapi.io/Pizza/${id}`
        )
        setPizza(data)
      } catch (error) {
        alert("Ошибка", error)
        navigate("/")
      }
    }
    fetchPizza()
  }, [])
  if (!pizza) {
    return "Загрузка"
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt='' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} р.</h4>
    </div>
  )
}
