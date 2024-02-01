import { ImageResponse } from 'next/og';
import ShowPeers from '@/components/ShowPeers';
import { BackgroundCanvas } from '@/components/BackgroundCanvas';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return new Response('Missing roomId', { status: 400 });
  }

  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            color: 'black',
            background: '#f6f6f6',
            width: '100%',
            height: '100%',
            paddingTop: 50,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            width='256'
            height='256'
            src={`https://github.com/vrajdesai78.png`}
            style={{
              borderRadius: 128,
            }}
          />
          <p>github.com/vrajdesai78</p>
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
