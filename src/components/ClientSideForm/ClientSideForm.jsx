'use client';
import styles from './ClientSideForm.module.scss';
import Button from '../Button/Button';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ClientSideForm({ onSubmit, provider }) {
  const formRef = useRef();
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    newName: '',
    currentPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
  });
  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(userData);
    console.log(session.user);
    formRef.current.reset();
  }

  return (
    <form ref={formRef} className={styles.formContainer}>
      <h3 className={styles.editTitles}>Change Your Name</h3>
      <label htmlFor="name">New Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) =>
          setUserData((prevUserData) => ({
            ...prevUserData,
            name: e.target.value,
          }))
        }
      />
      <div>
        <h3 className={styles.editTitles}>Change Your Password</h3>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          onChange={(e) =>
            setUserData((prevUserData) => ({
              ...prevUserData,
              currentPassword: e.target.value,
            }))
          }
        />

        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={(e) =>
            setUserData((prevUserData) => ({
              ...prevUserData,
              newPassword: e.target.value,
            }))
          }
        />

        <label htmlFor="confirmPassword">Re-enter Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) =>
            setUserData((prevUserData) => ({
              ...prevUserData,
              reEnterNewPassword: e.target.value,
            }))
          }
        />
      </div>

      <div className={styles.button}>
        <Button onClick={handleSubmit} style="secondary" text="Submit"></Button>
      </div>
    </form>
  );
}
