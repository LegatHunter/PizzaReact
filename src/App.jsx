import "./scss/app.scss"
import Header from "./components/Header"
import Categories from "./components/Categories"
import Sort from "./components/Sort"
import PizzaBlock from "./components/PizzaBlock"

function App() {
  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              <PizzaBlock title='Пицца 1' price={500} />
              <PizzaBlock title='Пицца 2' price={1000} />
              <PizzaBlock title='Пицца 3' price={1500} />
              <PizzaBlock title='Пицца 4' price={2000} />
              <PizzaBlock title='Пицца 5' price={2500} />
              <PizzaBlock title='Пицца 6' price={3000} />
              <PizzaBlock title='Пицца 7' price={3500} />
              <PizzaBlock title='Пицца 8' price={4000} />
              <PizzaBlock title='Пицца 9' price={4500} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
