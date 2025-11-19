import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async ({ sortBy, order, category, search, pageCount }) => {
    const { data } = await axios.get(
      `https://6914dcc43746c71fe049df36.mockapi.io/Pizza?page=${pageCount}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

const initialState = {
  items: [],
  status: "loading",
}

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading"
        state.items = []
        // console.log("Идет отправка")
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "success"
        state.items = action.payload
        // console.log("Данные успешно загружены")
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error"
        state.items = []
        // console.log("Была ошибка")
      })
  },
})

export const selectPizzaData = (state) => state.pizzas
export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
