'use client';

import { Client } from '@huddle01/server-sdk/client';
import { useEffect, useState } from 'react';

interface showPeersProps {
  roomId: string;
}

const ShowPeers = ({ roomId }: showPeersProps) => {
  const client = new Client({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  });

  const [peers, setPeers] = useState([]);

  useEffect(() => {
    const getPeers = async () => {
      const apiResponse = await fetch(
        `https://api.huddle01.com/api/v1/live-meeting/preview-peers?roomId=${roomId}`,
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
          },
        }
      );
      const response = await apiResponse.json();
      console.log(response);
    };
    getPeers();
  }, []);

  return <>{roomId}</>;
};

export default ShowPeers;
