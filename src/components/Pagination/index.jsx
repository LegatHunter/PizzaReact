import ReactPaginate from "react-paginate"
import style from "./Pagination.module.sass"

export default function Pagination({ onPageChange, value }) {
  return (
    <ReactPaginate
      className={style.pagination}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={5}
      forcePage={value - 1}
      renderOnZeroPageCount={null}
    />
  )
}
