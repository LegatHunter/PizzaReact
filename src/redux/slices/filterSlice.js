import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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

export const { setCategoryID, setSort, setPageCount, setFilters } =
  filterSlice.actions
export default filterSlice.reducer
