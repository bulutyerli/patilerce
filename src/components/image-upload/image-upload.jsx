import styles from './image-upload.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function ImageUpload({ onImageChange, profile }) {
  const [imageList, setImageList] = useState([]);
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
        if (imageList.length > 1) {
          throw new Error('You can not upload more than 1 image');
        }
      }
      if (imageList.length >= 4) {
        throw new Error('You can not upload more than 4 images');
      }
      const file = e.target.files[0];
      const imageData = new FormData();
      imageData.append('file', file);
      const response = await axios.post('/api/image-upload', imageData);
      const imageLink = await response.data.imageLinks;
      setImageList((prevImages) => [...prevImages, ...imageLink]);
      setSuccess(true);
    } catch (error) {
      const errorMsg = error.response.data.error;
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
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
          {imageList.map((image, index) => {
            const url = image.toString();
            return (
              <div key={index}>
                <Image src={url} alt="images" width={50} height={50}></Image>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
