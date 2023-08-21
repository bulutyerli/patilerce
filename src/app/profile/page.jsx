'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const logout = async () => {
    try {
      setIsLoading(true);
      await axios.get('/api/users/logout');
      router.push('/');
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section>
      <h1>Profile</h1>
      <Button
        onClick={logout}
        isLoading={isLoading}
        style="primary"
        text="Logout"
      />
      <h2></h2>
    </section>
  );
}
