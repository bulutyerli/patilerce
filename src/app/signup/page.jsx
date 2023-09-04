'use client';

import { useState, useEffect } from 'react';
import styles from './signup.module.scss';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import checkValidEmail from '@/helpers/checkValidEmail';
import {
  checkValidPassword,
  checkPasswordMatch,
} from '@/helpers/checkValidPassword';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    reEnteredPassword: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (
      userData.name.length > 3 &&
      checkValidEmail(userData.email) &&
      checkValidPassword(userData.password) &&
      checkPasswordMatch(userData.password, userData.reEnteredPassword)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    userData.email,
    userData.password,
    userData.reEnteredPassword,
    userData.name,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post('/api/auth/signup', userData);
      router.push('/');
      setUserData({
        name: '',
        email: '',
        password: '',
        reEnteredPassword: '',
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error?.response?.data?.error;
        setErrorMsg(errorMsg);
      }
      setUserData({
        ...userData,
        password: '',
        reEnteredPassword: '',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className={styles.container}>
        <Image
          className={styles.image}
          src="/images/signupPagePets.png"
          alt="happy pets"
          width={300}
          height={300}
        ></Image>
        <div>
          <h2>Join Us in Creating Forever Bonds</h2>
          <form className={styles.form}>
            <div className={styles.formElements}>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                value={userData.name}
                placeholder="minumum 4 letters"
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    name: e.target.value,
                  }))
                }
              />

              <label htmlFor="email">
                Email:{' '}
                {userData.email.length > 0 &&
                !checkValidEmail(userData.email) ? (
                  <span className={styles.notValid}>*Not valid</span>
                ) : (
                  ''
                )}
              </label>
              <input
                type="email"
                value={userData.email}
                placeholder="example@example.com"
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    email: e.target.value,
                  }))
                }
              />
              <label htmlFor="password">
                Password :
                {userData.password.length > 0 &&
                !checkValidPassword(userData.password) ? (
                  <span className={styles.notValid}>*Not valid</span>
                ) : (
                  ''
                )}
              </label>

              <input
                type="password"
                value={userData.password}
                placeholder="6+ chars: letter, num, symbol"
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    password: e.target.value,
                  }))
                }
              />
              <label htmlFor="reenteredPassword">
                Re-enter Password :
                {userData.reEnteredPassword.length > 0 &&
                !checkPasswordMatch(
                  userData.password,
                  userData.reEnteredPassword
                ) ? (
                  <span className={styles.notValid}>*No match</span>
                ) : (
                  ''
                )}
              </label>
              <input
                type="password"
                value={userData.reEnteredPassword}
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    reEnteredPassword: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.signUpText}>
              Already have an account?
              <Link className={styles.signupLink} href="/signin">
                {' '}
                Login here
              </Link>
            </div>
            <Button
              onClick={(e) => handleSubmit(e)}
              disableBtn={buttonDisabled}
              style="secondary"
              text="Sign Up"
              isLoading={isLoading}
            ></Button>
            <div className={styles.error}>{errorMsg}</div>
          </form>
        </div>
      </div>
    </section>
  );
}
