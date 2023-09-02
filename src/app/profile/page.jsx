'use client';

import styles from './profile.module.scss';
import Image from 'next/image';
import userNameShort from '@/helpers/userNameShort';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { checkValidPassword } from '@/helpers/checkValidPassword';
import axios from 'axios';

export default function ProfilePage() {
  const { data: session } = useSession();
  const oAuthUser = session?.user?.provider === 'google';
  const image = session?.user?.image;
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
  });
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNameBtnLoading, setNameBtnLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [nameBtnDisabled, setNameBtnDisabled] = useState(true);
  const [nameResMessage, setNameResMessage] = useState('');
  const [passwordResMessage, setPasswordResMessage] = useState('');
  const [nameSuccess, setNameSuccess] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);

  const onNameSubmit = async (e) => {
    setNameSuccess(false);

    e.preventDefault();
    try {
      setNameBtnLoading(true);
      const response = await axios.post('/api/auth/profile/namechange', {
        email: session.user.email,
        newName: name,
      });
      if (!response) {
        throw new Error('Something went wrong');
      }
      setNameResMessage(response.data.message);
      setNameSuccess(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error?.response?.data?.error;
        setNameResMessage(errorMsg);
      }
    } finally {
      setNameBtnLoading(false);
      setName('');
    }
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/profile/passwordchange', {
        email: session.user.email,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordResMessage(response.data.message);
      setPassSuccess(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error?.response?.data?.error;
        setPasswordResMessage(errorMsg);
      }
    } finally {
      setIsLoading(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        reEnterNewPassword: '',
      });
    }
  };

  useEffect(() => {
    if (name.length > 3) {
      setNameBtnDisabled(false);
    } else {
      setNameBtnDisabled(true);
    }
  }, [name]);

  useEffect(() => {
    if (
      checkValidPassword(passwordData.newPassword) &&
      passwordData.newPassword === passwordData.reEnterNewPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [passwordData]);

  return (
    <section className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>Profile </h1>
        <div>
          {image ? (
            <Image
              className={styles.profileImage}
              src={image}
              alt="profile image"
              width={50}
              height={50}
            />
          ) : (
            ''
          )}

          <h2>Logged in as {userNameShort(session?.user?.name)}</h2>
        </div>
        <Link href="/signout">
          <Button size="small" style="primary" text="Sign Out" />
        </Link>
        <dl className={styles.profileInfo}>
          <div>
            <dt>E-Mail:</dt>
            <dd>{session?.user?.email}</dd>
          </div>
          <div>
            <dt>Status:</dt>
            <dd>
              {session?.user?.isVerified ? 'Verified' : 'Not Verified'}
            </dd>{' '}
          </div>
        </dl>
      </div>
      <form className={styles.formContainer}>
        <h3 className={styles.formTitle}>Change Your Name</h3>
        <div className={styles.formElements}>
          <label htmlFor="name">New Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="min 4 letters"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.button}>
          <Button
            onClick={onNameSubmit}
            isLoading={isNameBtnLoading}
            disableBtn={nameBtnDisabled}
            style="secondary"
            text="Submit"
          ></Button>
        </div>
        {nameResMessage && (
          <p
            className={`${styles.responseMessage} ${
              nameSuccess ? styles.successMessage : ''
            }`}
          >
            {nameResMessage}
            <br />
            {nameSuccess
              ? 'Please refresh the page to see the updated name.'
              : ''}
          </p>
        )}

        {oAuthUser ? (
          ''
        ) : (
          <>
            <h3 className={styles.formTitle}>Change Your Password</h3>
            <div className={styles.formElements}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData((prevUserData) => ({
                    ...prevUserData,
                    currentPassword: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.formElements}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                placeholder="6+ chars: letter, num, symbol"
                onChange={(e) =>
                  setPasswordData((prevUserData) => ({
                    ...prevUserData,
                    newPassword: e.target.value,
                  }))
                }
              />
            </div>

            <div className={styles.formElements}>
              <label htmlFor="confirmPassword">Re-enter Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.reEnterNewPassword}
                onChange={(e) =>
                  setPasswordData((prevUserData) => ({
                    ...prevUserData,
                    reEnterNewPassword: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.button}>
              <Button
                onClick={onPasswordSubmit}
                isLoading={isLoading}
                disableBtn={buttonDisabled}
                style="secondary"
                text="Submit"
              ></Button>
            </div>

            {passwordResMessage && (
              <p
                className={`${styles.responseMessage} ${
                  passSuccess ? styles.successMessage : ''
                }`}
              >
                {passwordResMessage}
              </p>
            )}
          </>
        )}
      </form>
    </section>
  );
}
