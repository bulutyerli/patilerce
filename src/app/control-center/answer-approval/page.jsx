'use client';

import styles from './answer-approval.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react'; // Import useState
import CustomButton from '@/components/custom-button/custom-button';
import { toast } from 'react-toastify';

export default function ListingApprovalPage() {
  const [answers, setAnswers] = useState([]);
  const [rejectStates, setRejectStates] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get('/api/admin/answers');
        if (!response.data.success) {
          throw new Error('Could not get the listings');
        }
        setAnswers(response.data.answers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnswers();
  }, [answers]);

  const buttonHandler = async ({ id, buttonAction }) => {
    try {
      buttonAction === 'approve'
        ? setLoadingStates((prev) => ({ ...prev, [id]: true }))
        : setRejectStates((prev) => ({ ...prev, [id]: true }));
      const response = await axios.put('/api/admin/answers', {
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
      <h1>Approve Answers</h1>
      <div className={styles.cards}>
        {answers &&
          answers.map((answer, index) => {
            const isLoading = loadingStates[answer._id] || false;
            const isRejectLoading = rejectStates[answer._id] || false;
            return (
              <div className={styles.card} key={index}>
                <dl>
                  <dt>Answer:</dt>
                  <dd>{answer.answer}</dd>
                </dl>
                <dl>
                  <dt>User:</dt>
                  <dd>{answer.user.name}</dd>
                </dl>
                <dl>
                  <dt>User Email:</dt>
                  <dd>{answer.user.email}</dd>
                </dl>
                <div className={styles.buttons}>
                  <div className={styles.button}>
                    <CustomButton
                      isLoading={isLoading}
                      onClick={() => {
                        buttonHandler({
                          id: answer._id,
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
                          id: answer._id,
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
