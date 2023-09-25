import styles from './custom-button.module.scss';

export default function CustomButton({
  onClick,
  text,
  disableBtn,
  isLoading,
  style,
  size,
  type,
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
      type={type}
      onClick={onClick}
      className={`${styles.button} ${
        disableBtn || isLoading ? styles.disabled : ''
      } ${isLoading ? styles.loading : ''} ${btnColor} ${btnSize}`}
    >
      {isLoading ? null : text}
    </button>
  );
}
