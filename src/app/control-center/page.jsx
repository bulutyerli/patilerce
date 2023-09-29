'use client';

import styles from './users.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react'; // Import useState
import Image from 'next/image';
import CustomButton from '@/components/custom-button/custom-button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        if (!response.data.success) {
          throw new Error('Could not get the users');
        }
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const banHandler = async (id, action) => {
    try {
      const response = await axios.put('/api/admin/users', id, action);
      if (!response.data.success) {
        toast.error('Something went wrong');
      }
      toast.success('Successful');
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Users List (Total: {users.length})</h1>
      <div className={styles.cards}>
        {users &&
          users.map((user, index) => {
            return (
              <div key={index} className={styles.card}>
                <div className={styles.user}>
                  <dl>
                    <Image
                      src={user.image}
                      alt="profile picture"
                      width={50}
                      height={50}
                    ></Image>
                  </dl>
                  <div>
                    <dl>
                      <dt>Name:</dt>
                      <dd>{user.name}</dd>
                    </dl>
                    <dl>
                      <dt>Email:</dt>
                      <dd>{user.email}</dd>
                    </dl>
                  </div>
                </div>
                {user.isBanned ? (
                  <div>
                    {' '}
                    <CustomButton
                      style={'secondary'}
                      size={'small'}
                      text={'Unban'}
                      onClick={() => {
                        banHandler({
                          id: user._id.toString(),
                          action: 'unban',
                        });
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <CustomButton
                      onClick={() => {
                        banHandler({ id: user._id.toString(), action: 'ban' });
                      }}
                      style={'primary'}
                      size={'small'}
                      text={'Ban'}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
