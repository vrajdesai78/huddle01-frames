'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface props {
  roomId: string;
}

const Redirect = ({ roomId }: props) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`https://app.huddle01.com/${roomId}`);
  }, [roomId]);

  return <></>;
};

export default Redirect;
