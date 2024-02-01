import { ImageResponse } from 'next/og';
import ShowPeers from '@/components/ShowPeers';

export const runtime = 'edge';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return new Response('Missing roomId', { status: 400 });
  }

  try {
    console.log('here');
    return new ImageResponse(<div>Hello World!</div>, {
      width: 1200,
      height: 630,
    });
  } catch (e: any) {
    console.log(e);
    return new Response(e, { status: 500 });
  }
}
