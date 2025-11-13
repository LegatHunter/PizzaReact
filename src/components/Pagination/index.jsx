import ReactPaginate from "react-paginate"
import style from "./Pagination.module.sass"

export default function Pagination({ onPageChange }) {
  return (
    <ReactPaginate
      className={style.pagination}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={4}
      renderOnZeroPageCount={null}
    />
  )
}
