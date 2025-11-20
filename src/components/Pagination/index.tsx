import ReactPaginate from "react-paginate"
import style from "./Pagination.module.sass"

type PaginationProps = {
  onPageChange: (e: number) => void
  value: number
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange, value }) => {
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
export default Pagination
