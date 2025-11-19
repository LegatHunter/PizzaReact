import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
    setCategoryID(state, action) {
      state.categoryID = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setPageCount(state, action) {
      state.pageCount = action.payload
    },
    setFilters(state, action) {
      state.pageCount = Number(action.payload.pageCount)
      state.sort = action.payload.sort
      state.categoryID = Number(action.payload.categoryID)
    },
  },
})

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sort

export const {
  setCategoryID,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
} = filterSlice.actions
export default filterSlice.reducer
