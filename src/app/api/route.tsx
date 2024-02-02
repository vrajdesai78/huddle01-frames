import { ImageResponse } from 'next/og';

export const runtime = 'edge';

interface previewPeersMetadata {
  roomId: string;
  previewPeers: {
    displayName: string;
  }[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return new Response('Missing roomId', { status: 400 });
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
    return new ImageResponse(
      (
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
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(e);
    return new Response(e, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return new Response('Missing roomId', { status: 400 });
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

  const staticPeersMetadata = [
    {
      displayName: 'vraj.eth',
    },
    {
      displayName: 'axit.eth',
    },
    {
      displayName: 'deepso.eth',
    },
  ];

  try {
    return new ImageResponse(
      (
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
            {staticPeersMetadata.map((peer) => (
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
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(e);
    return new Response(e, { status: 500 });
  }
}
