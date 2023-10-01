'use client';

import styles from './question-approval.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomButton from '@/components/custom-button/custom-button';
import { toast } from 'react-toastify';

export default function ListingApprovalPage() {
  const [questions, setQuestions] = useState([]);
  const [rejectStates, setRejectStates] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/admin/questions');
        if (!response.data.success) {
          throw new Error('Could not get the listings');
        }
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [questions]);

  const buttonHandler = async ({ id, buttonAction }) => {
    try {
      buttonAction === 'approve'
        ? setLoadingStates((prev) => ({ ...prev, [id]: true }))
        : setRejectStates((prev) => ({ ...prev, [id]: true }));
      const response = await axios.put('/api/admin/questions', {
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
      <h1>Approve Questions</h1>
      <div className={styles.cards}>
        {questions &&
          questions.map((question, index) => {
            const isLoading = loadingStates[question._id] || false;
            const isRejectLoading = rejectStates[question._id] || false;
            return (
              <div className={styles.card} key={index}>
                <dl>
                  <dt>Title:</dt>
                  <dd>{question.title}</dd>
                </dl>
                <dl>
                  <dt>Question:</dt>
                  <dd>{question.question}</dd>
                </dl>
                <dl>
                  <dt>User:</dt>
                  <dd>{question.user.name}</dd>
                </dl>
                <dl>
                  <dt>User Email:</dt>
                  <dd>{question.user.email}</dd>
                </dl>
                <div className={styles.buttons}>
                  <div className={styles.button}>
                    <CustomButton
                      isLoading={isLoading}
                      onClick={() => {
                        buttonHandler({
                          id: question._id,
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
                          id: question._id,
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
