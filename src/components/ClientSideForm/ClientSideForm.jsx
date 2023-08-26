'use client';
import { useRef } from 'react';
import styles from './ClientSideForm.module.scss';
import Button from '../Button/Button';

export default function ClientSideForm({ onSubmit }) {
  const formRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    await onSubmit(formData);
    formRef.current.reset();
  }

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h3 className={styles.editTitles}>Change Your Name</h3>
      <label htmlFor="name">New Name:</label>
      <input type="text" id="name" name="name" />

      <h3 className={styles.editTitles}>Change Your Password</h3>
      <label htmlFor="currentPassword">Current Password</label>
      <input type="password" id="currentPassword" name="currentPassword" />

      <label htmlFor="newPassword">New Password</label>
      <input type="password" id="newPassword" name="newPassword" />

      <label htmlFor="confirmPassword">Re-enter Password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" />

      <div className={styles.button}>
        <Button onClick={handleSubmit} style="secondary" text="Submit"></Button>
      </div>
    </form>
  );
}
