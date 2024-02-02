import { ImageResponse } from 'next/og';
import ShowPeers from '@/components/ShowPeers';
import { previewPeersMetadata } from '@/utils/types';

export const runtime = 'edge';

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
      <ShowPeers previewPeers={peers.previewPeers} roomId={roomId} />,
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
      <ShowPeers previewPeers={staticPeersMetadata} roomId={roomId} />,
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
