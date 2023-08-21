import styles from './button.module.scss';

export default function Button({
  onClick,
  text,
  disableBtn,
  isLoading,
  style,
}) {
  let btnColor = styles.default;

  if (style === 'primary') {
    btnColor = styles.primary;
  }
  if (style === 'secondary') {
    btnColor = styles.secondary;
  }
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        disableBtn || isLoading ? styles.disabled : ''
      } ${isLoading ? styles.loading : ''} ${btnColor}`}
    >
      {isLoading ? null : text}
    </button>
  );
}
