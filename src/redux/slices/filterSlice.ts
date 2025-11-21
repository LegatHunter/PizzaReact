import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string
  sortProp: SortPropertyEnum
}

export type SortListItem = {
  name: string
  sortProp: SortPropertyEnum
}

export interface IFilterSliceState {
  searchValue: string
  categoryID: number
  pageCount: number
  sort: Sort
}

export type UrlParams = {
  sortProp?: SortPropertyEnum
  categoryID?: string
  pageCount?: string
}

const initialState: IFilterSliceState = {
  searchValue: "",
  categoryID: 0,
  pageCount: 1,
  sort: {
    name: "популярности ↑",
    sortProp: SortPropertyEnum.RATING_DESC,
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
    setFilters(
      state,
      action: PayloadAction<{
        categoryID: number
        pageCount: number
        sort: Sort
      }>
    ) {
      state.pageCount = action.payload.pageCount
      state.sort = action.payload.sort
      state.categoryID = action.payload.categoryID
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
