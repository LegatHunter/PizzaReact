import styles from "./NotFoundBlock.module.sass"
export default function NotFoundBlock() {
  return (
    <h1 className={styles.root}>
      <span>🙈</span>
      <br />
      Ничего не найдено
    </h1>
  )
}
