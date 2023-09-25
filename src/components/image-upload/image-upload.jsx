'use client';

import styles from './image-upload.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { PiTrash } from 'react-icons/pi';

export default function ImageUpload({ onImageChange, profile, images }) {
  const [imageList, setImageList] = useState(images);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    onImageChange(imageList, success);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageList]);

  const handleImageChange = async (e) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      if (profile) {
        setImageList([]);
        if (imageList.length > 1) {
          throw new Error('You can not upload more than 1 image');
        }
      }
      if (imageList.length >= 4) {
        throw new Error('You can not upload more than 4 images');
      }
      const file = e.target.files[0];
      if (!file) {
        return;
      }

      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        throw new Error('Invalid file type. Please upload a JPG or PNG file.');
      }

      const imageData = new FormData();
      imageData.append('file', file);
      const response = await axios.post('/api/image-upload', imageData);
      const imageLink = await response.data.imageLinks;
      setImageList((prevImages) => [...prevImages, ...imageLink]);
      setSuccess(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index) => {
    const updatedImageList = [...imageList];
    updatedImageList.splice(index, 1);
    setImageList(updatedImageList);
  };

  return (
    <div className={styles.fileInputContainer}>
      <label htmlFor="images">
        Images: {isLoading && <div className={styles.loading}>Uploading</div>}
      </label>
      {profile ? '' : <span>You can upload 4 images at most</span>}
      <input
        type="file"
        id="images"
        name="images"
        accept="image/*"
        required
        onChange={(e) => {
          handleImageChange(e);
        }}
      />
      <div className={styles.errorMessage}>{errorMessage}</div>
      {profile ? (
        ''
      ) : (
        <div className={styles.fileList}>
          {imageList &&
            imageList.map((image, index) => {
              const url = image.toString();
              return (
                <div className={styles.images} key={index}>
                  <Image src={url} alt="images" width={50} height={50}></Image>
                  <div
                    onClick={() => {
                      removeImage(index);
                    }}
                    className={styles.deleteIcon}
                  >
                    <PiTrash />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
