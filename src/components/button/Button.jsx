import styles from './button.module.scss';

export default function Button({ onClick, text, disableBtn, isLoading }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        disableBtn || isLoading ? styles.disabled : ''
      } ${isLoading ? styles.loading : ''}`}
    >
      {isLoading ? null : text}
    </button>
  );
}
