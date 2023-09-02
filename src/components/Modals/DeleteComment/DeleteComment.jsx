import Button from '../../Button/Button';

export function DeleteComment() {
  return (
    <div className={styles.container}>
      <p>Your comment will be deleted.</p>
      <p>Are you sure?</p>
      <div className={styles.buttonContainer}>
        <Button text="No" />
        <Button text="Yes" />
      </div>
    </div>
  );
}
