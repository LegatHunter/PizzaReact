import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"

export type SearchPizzaParams = {
  sortBy: string
  order: string
  category: string
  search: string
  pageCount: string
}

export type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
  rating: number
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IPizzaSliceState {
  items: Pizza[]
  status: Status
}

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizzas/fetchPizzasStatus",
  async ({ sortBy, order, category, search, pageCount }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://6914dcc43746c71fe049df36.mockapi.io/Pizza?page=${pageCount}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS
        state.items = action.payload
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR
        state.items = []
      })
  },
})

export const selectPizzaData = (state: RootState) => state.pizzas
export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
