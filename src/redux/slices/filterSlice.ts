import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type Sort = {
  name: string
  sortProp: "rating" | "title" | "price" | "-rating" | "-title" | "-price"
}

interface IFilterSliceState {
  searchValue: string
  categoryID: number
  pageCount: number
  sort: Sort
}

const initialState: IFilterSliceState = {
  searchValue: "",
  categoryID: 0,
  pageCount: 1,
  sort: {
    name: "популярности ↑",
    sortProp: "rating",
  },
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryID(state, action: PayloadAction<number>) {
      state.categoryID = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.pageCount = Number(action.payload.pageCount)
      state.sort = action.payload.sort
      state.categoryID = Number(action.payload.categoryID)
    },
  },
})

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const {
  setCategoryID,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
} = filterSlice.actions
export default filterSlice.reducer
