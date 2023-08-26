import styles from './button.module.scss';

export default function Button({
  onClick,
  text,
  disableBtn,
  isLoading,
  style,
  size,
}) {
  let btnColor = styles.default;
  let btnSize;

  if (style === 'primary') {
    btnColor = styles.primary;
  }
  if (style === 'secondary') {
    btnColor = styles.secondary;
  }

  if (size === 'small') {
    btnSize = styles.small;
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        disableBtn || isLoading ? styles.disabled : ''
      } ${isLoading ? styles.loading : ''} ${btnColor} ${btnSize}`}
    >
      {isLoading ? null : text}
    </button>
  );
}
