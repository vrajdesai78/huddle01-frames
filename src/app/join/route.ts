import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs';

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
    if (!urlString.startsWith(process.env['HOST'] || '')) {
      return new Response('Invalid frame url', { status: 400 });
    }
  } catch (e: any) {
    return new Response(e, { status: 500 });
  }

  const buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;
  const fid = validatedMessage?.data?.fid || 0;

  return new Response(buttonId.toString(), { status: 200 });
}
