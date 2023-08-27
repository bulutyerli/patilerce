import Button from '@/components/Button/Button';
import styles from './askquestion.module.scss';
import Image from 'next/image';

export default function AddQuestion() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ask to Community</h1>
      <div className={styles.pageContainer}>
        <Image
          className={styles.image}
          src="/images/addquestionDogImage.png"
          width={300}
          height={300}
          alt="curious dog"
        ></Image>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title:
            </label>
            <input className={styles.questionTitle} type="text" id="title" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="question" className={styles.label}>
              Question:
            </label>
            <textarea
              className={styles.textarea}
              name="question"
              id="question"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className={styles.submitButton}>
            <Button text="Send"></Button>
          </div>
        </form>
      </div>
    </div>
  );
}
