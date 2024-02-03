import { NextApiRequest, NextApiResponse } from 'next';
import satori from 'satori';
import sharp from 'sharp';

interface previewPeersMetadata {
  roomId: string;
  previewPeers: {
    displayName: string;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roomId } = req.query;

  if (!roomId) {
    return res.status(400).json({ message: 'Missing roomId' });
  }

  const peersMetadata = await fetch(
    `https://api.huddle01.com/api/v1/live-meeting/preview-peers?roomId=${roomId}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY!,
      },
    }
  );

  const peers = (await peersMetadata.json()) as previewPeersMetadata;

  try {
    const svg = await satori(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
      >
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '3rem',
            marginTop: '1rem',
            color: 'white',
          }}
        >
          Huddle01
        </span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            margin: '1.5rem',
          }}
        >
          {peers.previewPeers.map((peer) => (
            <div
              key={peer.displayName}
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                gap: '0.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  width: '6rem',
                  height: '6rem',
                  borderRadius: '50%',
                  color: 'white',
                  backgroundColor: '#2d2d2d',
                }}
              >
                {peer.displayName[0].toUpperCase()}
              </div>
              <span style={{ color: 'white' }}>{peer.displayName}</span>
            </div>
          ))}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [],
      }
    );

    const pngBuffer = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.send(pngBuffer);
  } catch (e) {
    res.status(500).send(e);
  }
}
