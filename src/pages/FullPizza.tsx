import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>({ imageUrl: "", title: "", price: 0 })
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
        alert("Ошибка")
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

export default FullPizza
