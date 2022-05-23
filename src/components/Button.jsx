import styles from "./Button.module.css";

function Button({ title, onClick, disabled, id }) {
  // setPage(page+1)
  return (
    <button id={id} data-testid="button-component" className={styles.button} onClick={()=>onClick()} disabled={disabled}>
      {title} 
    </button>
  );
}

export default Button;
