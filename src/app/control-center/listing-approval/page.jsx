'use client';

import styles from './listing-approval.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react'; // Import useState
import Image from 'next/image';
import CustomButton from '@/components/custom-button/custom-button';
import { toast } from 'react-toastify';
import imageKitLoader from '@/lib/imageKitLoader/imageLoader';

export default function ListingApprovalPage() {
  const [adopts, setAdopts] = useState([]);
  const [rejectStates, setRejectStates] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);

  useEffect(() => {
    const fetchAdopts = async () => {
      try {
        const response = await axios.get('/api/admin/adopts');
        if (!response.data.success) {
          throw new Error('Could not get the listings');
        }
        setAdopts(response.data.adopts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdopts();
  }, [adopts]);

  const buttonHandler = async ({ id, buttonAction }) => {
    try {
      buttonAction === 'approve'
        ? setLoadingStates((prev) => ({ ...prev, [id]: true }))
        : setRejectStates((prev) => ({ ...prev, [id]: true }));
      const response = await axios.put('/api/admin/adopts', {
        adoptId: id,
        action: buttonAction,
      });
      console.log(buttonAction);
      if (!response.data.success) {
        toast.error('Something went wrong');
        throw new Error(response.data.message);
      }
      toast.success(`${buttonAction === 'approve' ? 'Approved' : 'Rejected'}`);
    } catch (error) {
      console.log(error);
    } finally {
      buttonAction === 'approve'
        ? setLoadingStates((prev) => ({ ...prev, [id]: false }))
        : setRejectStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Approve Listings</h1>
      <div className={styles.cards}>
        {adopts &&
          adopts.map((adopt, index) => {
            const isLoading = loadingStates[adopt._id] || false;
            const isRejectLoading = rejectStates[adopt._id] || false;

            return (
              <div className={styles.card} key={index}>
                <dl>
                  <dt>Images:</dt>
                  <dl>
                    {adopt.images.map((image, index) => {
                      return (
                        <div className={styles.images} key={index}>
                          <Image
                            loader={imageKitLoader}
                            src={image}
                            alt="pet image"
                            width={40}
                            height={40}
                          ></Image>
                        </div>
                      );
                    })}
                  </dl>
                </dl>
                <dl>
                  <dt>Title:</dt>
                  <dd>{adopt.title}</dd>
                </dl>
                <dl>
                  <dt>Details:</dt>
                  <dd>{adopt.details}</dd>
                </dl>
                <dl>
                  <dt>Pet Type:</dt>
                  <dd>{adopt.petType}</dd>
                </dl>
                <dl>
                  <dt>Breed:</dt>
                  <dd>{adopt.breed}</dd>
                </dl>
                <dl>
                  <dt>User:</dt>
                  <dd>{adopt.user.name}</dd>
                </dl>
                <dl>
                  <dt>User Email:</dt>
                  <dd>{adopt.user.email}</dd>
                </dl>
                <div className={styles.buttons}>
                  <div className={styles.button}>
                    <CustomButton
                      isLoading={isLoading}
                      onClick={() => {
                        buttonHandler({
                          id: adopt._id,
                          buttonAction: 'approve',
                        });
                      }}
                      style={'secondary'}
                      text={'Approve'}
                    />
                  </div>
                  <div className={styles.button}>
                    <CustomButton
                      isLoading={isRejectLoading}
                      onClick={() => {
                        buttonHandler({
                          id: adopt._id,
                          buttonAction: 'reject',
                        });
                      }}
                      style={'primary'}
                      text={'Reject'}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
