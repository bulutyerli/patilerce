'use client';

import styles from './profile.module.scss';
import Image from 'next/image';
import userNameShort from '@/helpers/short-username';
import CustomButton from '@/components/custom-button/custom-button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { checkValidPassword } from '@/helpers/check-valid-password';
import axios from 'axios';
import ImageUpload from '@/components/image-upload/image-upload';
import checkValidImageUrl from '@/helpers/check-valid-image-url';

export default function ProfileSettingsPage() {
  const { data: session } = useSession();
  const oAuthUser = session?.user?.provider === 'google';
  const image = session?.user?.image;
  const isImageValid = checkValidImageUrl(image);
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
  const [imageMessage, setImageMessage] = useState('');
  const [imageErrorMsg, setImageErrorMsg] = useState('');

  const onNameSubmit = async (e) => {
    setNameSuccess(false);

    e.preventDefault();
    try {
      setNameBtnLoading(true);
      const response = await axios.post('/api/auth/profile/info-change', {
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
    setPassSuccess(false);
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/profile/password-change', {
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

  const onImageChange = async (imageList) => {
    try {
      setImageMessage('');
      if (checkValidImageUrl(imageList)) {
        const newImage = imageList;
        const response = await axios.post('/api/auth/profile/info-change', {
          email: session.user.email,
          profileImage: newImage,
        });
        setImageMessage(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setImageErrorMsg(error?.response?.data?.error);
      }
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>Profile Settings </h1>
        <div>
          {isImageValid ? (
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
        <Link href="/sign-out">
          <CustomButton size="small" style="primary" text="Sign Out" />
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
          <h3 className={styles.formTitle}>Change Profile Picture</h3>
          <dt className={styles.imageUpload}>
            <ImageUpload
              images={''}
              profile={true}
              onImageChange={onImageChange}
            />
          </dt>
          <span className={styles.imageSuccess}>{imageMessage}</span>
          <span className={styles.imageError}>{imageErrorMsg}</span>
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
          <CustomButton
            onClick={onNameSubmit}
            isLoading={isNameBtnLoading}
            disableBtn={nameBtnDisabled}
            style="secondary"
            text="Submit"
          ></CustomButton>
        </div>
        {nameResMessage && (
          <p
            className={`${styles.responseMessage} ${
              nameSuccess ? styles.successMessage : ''
            }`}
          >
            {nameResMessage}
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
              <CustomButton
                onClick={onPasswordSubmit}
                isLoading={isLoading}
                disableBtn={buttonDisabled}
                style="secondary"
                text="Submit"
              ></CustomButton>
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
