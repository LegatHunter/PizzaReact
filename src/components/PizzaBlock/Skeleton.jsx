import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}>
    <circle cx='128' cy='128' r='128' />
    <rect x='0' y='277' rx='10' ry='10' width='280' height='22' />
    <rect x='0' y='319' rx='10' ry='10' width='280' height='88' />
    <rect x='0' y='435' rx='15' ry='15' width='100' height='30' />
    <rect x='128' y='420' rx='25' ry='25' width='152' height='45' />
  </ContentLoader>
)

export default Skeleton
