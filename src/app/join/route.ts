import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs';
import { headers } from 'next/headers';

const HUB_URL = 'nemes.farcaster.xyz:2283';
const client = getSSLHubRpcClient(HUB_URL);

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  // access body from Request
  const body = await request.json();

  let validatedMessage: Message | undefined;

  try {
    const frameMessage = Message.decode(
      Buffer.from(body?.trustedData?.messageBytes || '', 'hex')
    );
    const result = await client.validateMessage(frameMessage);
    if (result.isOk() && result.value.valid) {
      validatedMessage = result.value.message;
    }

    // Also validate the frame url matches the expected url
    let urlBuffer = validatedMessage?.data?.frameActionBody?.url || [];
    const urlString = Buffer.from(urlBuffer).toString('utf-8');
    if (!urlString.startsWith(process.env.HOST_URL || '')) {
      return new Response('Invalid frame url', { status: 400 });
    }
  } catch (e: any) {
    return new Response(e, { status: 500 });
  }

  const buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;

  if (roomId && buttonId === 1) {
    const imageUrl = `${process.env.HOST_URL}/reload?roomId=${roomId}`;
    return new Response(
      `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Refreshing Room</title>
                <meta property="og:title" content="Refreshing Room" />
                <meta property="og:image" content="${imageUrl}" />
                <meta name="fc:frame" content="vNext">
                <meta name="fc:frame:image" content="${imageUrl}">
                <meta name="fc:frame:post_url" content="${process.env.HOST_URL}/join?roomId=${roomId}">
                <meta name="fc:frame:button:1" content="Refresh Preview">
                <meta name="fc:frame:button:2" content="Join Room">
                <meta name="fc:frame:button:2:action" content="post_redirect">
            </head>
        <body>
        <p> You have refreshed preview for room ${roomId} </p>
        </body>
        </html>
    `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
        status: 200,
      }
    );
  }

  if (roomId && buttonId === 2) {
    return new Response('Joining room', {
      status: 302,
      headers: {
        Location: `https://app.huddle01.com/${roomId}`,
      },
    });
  }

  return new Response('Invalid request', { status: 400 });
}
