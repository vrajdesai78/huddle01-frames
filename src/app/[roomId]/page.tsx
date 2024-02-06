import Redirect from '@/component/Redirect';
import { Metadata } from 'next';

interface Props {
  params: { roomId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fcMetadata: Record<string, string> = {
    'fc:frame': 'vNext',
    'fc:frame:post_url': `${process.env.HOST_URL}/join?roomId=${params.roomId}`,
    'fc:frame:image': `${process.env.HOST_URL}/preview?roomId=${
      params.roomId
    }&time=${Date.now()}`,
    'fc:frame:button:1': 'Refresh Preview',
    'fc:frame:button:2': 'Join Meeting',
    'fc:frame:button:2:action': 'post_redirect',
  };

  return {
    title: 'Huddle01 Frame',
    openGraph: {
      title: 'Huddle01 Meet',
      images: [
        `${process.env.HOST_URL}/preview?roomId=${
          params.roomId
        }&time=${Date.now()}`,
      ],
    },
    other: {
      ...fcMetadata,
    },
    metadataBase: new URL(`${process.env.HOST_URL}`),
  };
}

const Room = ({ params }: Props) => {
  // return <Redirect roomId={params.roomId} />;
  return <div>Room</div>;
};

export default Room;
