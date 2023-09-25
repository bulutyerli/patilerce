'use client';

import styles from './listing-form.module.scss';
import { useEffect, useState } from 'react';
import breedsList from '@/helpers/breeds-list.json';
import CustomButton from '@/components/custom-button/custom-button';
import ImageUpload from '@/components/image-upload/image-upload';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ListingForm({ petData, isEdit, adoptId }) {
  const [formData, setFormData] = useState(petData);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      setFormData(petData);
    }
  }, [isEdit, petData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === 'title'
          ? value.slice(0, 60)
          : name === 'details'
          ? value.slice(0, 1000)
          : value,
    });
  };

  useEffect(() => {
    if (formData.petType === 'Dog') {
      setFormData((prevData) => ({
        ...prevData,
        breed: 'Local Dog(Mixed Breed)',
      }));
    }
  }, [formData.petType]);

  useEffect(() => {
    const { email, phoneNumber, ...rest } = formData;
    const values = Object.values(rest);
    const isFormValid = values.every((value) => value.length > 0);
    setIsDisabled(!isFormValid);
  }, [formData]);

  const onImageChange = (imageList) => {
    setFormData({ ...formData, images: imageList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (isEdit) {
        const response = await axios.put('/api/adopt', {
          adoptId: adoptId,
          formData: formData,
        });
      } else {
        const response = await axios.post('/api/adopt', { formData });
      }
      router.back();
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage('Couldnt create listing, try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <Image
          className={styles.dogsImage}
          src="/images/dogs.svg"
          alt="dogs"
          width={300}
          height={300}
        ></Image>
        <div className={styles.formHalf}>
          <div className={styles.fieldGroup}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              autoComplete="off"
              onChange={handleInputChange}
              required
              maxLength={60}
              placeholder="Maximum 60 letters"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="details">Details:</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              required
              maxLength={1000}
              placeholder="Provide details about the pet (e.g., personality, special needs, last home)"
            ></textarea>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="petType">Pet Type:</label>
            <select
              id="petType"
              name="petType"
              value={formData.petType}
              onChange={handleInputChange}
              required
            >
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
            </select>
          </div>

          <ImageUpload images={formData.images} onImageChange={onImageChange} />
        </div>
        <div className={styles.formHalf}>
          <div className={styles.fieldGroup}>
            <label htmlFor="breed">Breed:</label>
            <select
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              required
            >
              {formData.petType === 'Cat'
                ? breedsList.cats.map((cat) => {
                    return (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    );
                  })
                : breedsList.dogs.map((dog) => {
                    return (
                      <option key={dog} value={dog}>
                        {dog}
                      </option>
                    );
                  })}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="age">Age:</label>
            <div className={styles.ageContainer}>
              <select
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              >
                {breedsList.ages.map((age) => {
                  return (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="gender">Gender:</label>
            <div className={styles.genderButtons}>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleInputChange}
                checked={formData.gender === 'Male'}
                required
              />{' '}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleInputChange}
                checked={formData.gender === 'Female'}
                required
              />{' '}
              Female
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <span className={styles.contact}>
              Contact Information on Listing
              <br />
              (not required)
            </span>

            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="email">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              autoComplete="off"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.errorMessage}>{errorMessage}</div>
          <div className={styles.submitButton}>
            <CustomButton
              disableBtn={isDisabled}
              isLoading={isLoading}
              onClick={(e) => handleSubmit(e)}
              style={'secondary'}
              text={isEdit ? 'Update' : 'Send Form'}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
