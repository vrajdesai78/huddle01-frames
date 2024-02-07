import { ImageResponse } from 'next/og';

export const runtime = 'edge';

interface previewPeersMetadata {
  roomId: string;
  previewPeers: {
    displayName: string;
  }[];
  peersCount: number;
}

export const dynamic = 'force-dynamic';

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

  console.log('called', peers, roomId);
  const { previewPeers, peersCount } = peers;

  try {
    return new ImageResponse(
      (
        <div
          style={{
            margin: 0,
            padding: 0,
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#181A23',
            backgroundImage:
              "url('https://huddle01-assets-frontend.s3.amazonaws.com/OG/grid.png')",
          }}
        >
          <div
            style={{
              backgroundColor: '#23262F',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              paddingLeft: '1.75rem',
            }}
          >
            <img
              height={40}
              width={180}
              src={
                'https://huddle01-assets-frontend.s3.amazonaws.com/OG/logo.png'
              }
            />
          </div>
          {previewPeers?.length > 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                height: '80%',
                margin: '1.5rem',
              }}
            >
              <div
                style={{
                  color: 'white',
                  width: '48%',
                  height: '100%',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                  }}
                >
                  {previewPeers.slice(0, 4).map((peer) => (
                    <div
                      key={peer.displayName}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#3C3F58',
                          borderRadius: '50%',
                          width: '4rem',
                          height: '4rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                        }}
                      >
                        {peer.displayName[0].toUpperCase()}
                      </div>
                      <span
                        style={{
                          fontSize: '2rem',
                        }}
                      >
                        {peer.displayName}
                      </span>
                    </div>
                  ))}
                  {previewPeers.length > 4 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#3C3F58',
                          borderRadius: '50%',
                          width: '4rem',
                          height: '4rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke-width='1.5'
                          stroke='currentColor'
                          width='2.5rem'
                          height='2.5rem'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                          />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: '2rem',
                        }}
                      >
                        {peersCount - 4}+ Participants
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyItems: 'center',
                  fontWeight: '600',
                  width: '48%',
                  color: 'white',
                  fontFamily: 'Inter',
                }}
              >
                <span style={{ fontSize: '5rem' }}>Join this</span>
                <span style={{ fontSize: '4rem' }}>Huddle01 Call</span>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                color: 'white',
                fontSize: '5rem',
              }}
            >
              No one is in the call yet
            </div>
          )}
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
