import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roomId } = req.query;

  console.log('roomId', roomId);

  const peersMetadata = await fetch(
    `https://api.huddle01.com/api/v1/live-meeting/preview-peers?roomId=${roomId}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY!,
      },
      cache: 'no-store',
    }
  );

  const peers = await peersMetadata.json();

  console.log('peers', peers);

  res.status(200).json(peers);
}
