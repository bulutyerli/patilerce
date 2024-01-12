'use client';

import styles from './profile-settings.module.scss';
import Image from 'next/image';
import CustomButton from '@/components/custom-button/custom-button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { checkValidPassword } from '@/helpers/check-valid-password';
import axios from 'axios';
import ImageUpload from '@/components/image-upload/image-upload';
import checkValidImageUrl from '@/helpers/check-valid-image-url';
import { toast } from 'react-toastify';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function ProfilePage() {
  const { data: session } = useSession();
  const oAuthUser = session?.user?.provider === 'google';
  const image = session?.user?.image ?? '/images/cat-profile.svg';
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
  });

  const [name, setName] = useState('');
  const [profileName, setProfileName] = useState('');
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
  const [emailButtonLoading, setEmailButtonLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const isImageValid = checkValidImageUrl(imageUrl);

  const getProfileImage = async () => {
    try {
      setImageLoading(true);
      const response = await axios.get('/api/auth/profile/info-change');
      if (!response.data.success) {
        throw new Error(error);
      }
      setImageUrl(response.data.image);
    } catch (error) {
      setImageErrorMsg('Could not get profile image');
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    setProfileName(session?.user?.name);
  }, [session]);

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
      setProfileName(name);
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
        getProfileImage();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setImageErrorMsg(error?.response?.data?.error);
      }
    }
  };

  const verifyEmailHandler = async () => {
    try {
      setEmailButtonLoading(true);
      const response = await axios.post('/api/auth/new-verify-email', {
        clientEmail: session?.user?.email,
      });
      if (!response.data.success) {
        throw new Error(response.data.error);
      }
      toast.success('A new verification email sent!');
    } catch (error) {
      toast.error('Could not send email, try again.');
      console.log(error.message);
    } finally {
      setEmailButtonLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>Profile Settings </h1>
        <div>
          {isImageValid || !imageLoading ? (
            <Image
              loader={imageKitLoader}
              className={styles.profileImage}
              src={imageUrl.length < 1 ? image : imageUrl}
              alt="profile image"
              width={50}
              height={50}
            />
          ) : (
            ''
          )}

          <h2>
            Logged in as <span className={styles.userName}>{profileName}</span>
          </h2>
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
            <dd>{session?.user?.isVerified ? 'Verified' : 'Not Verified'}</dd>
            {session?.user?.isVerified ? (
              ''
            ) : (
              <div>
                <CustomButton
                  isLoading={emailButtonLoading}
                  onClick={verifyEmailHandler}
                  text={'Send Email Again'}
                  size={'small'}
                />
              </div>
            )}
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
            autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
