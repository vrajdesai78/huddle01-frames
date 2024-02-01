import ShowPeers from '@/components/ShowPeers';
import { Metadata } from 'next';

interface Props {
  params: { roomId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fcMetadata: Record<string, string> = {
    'fc:frame': 'vNext',
    'fc:frame:post_url': `https://huddle01-frames.vercel.app/api?roomId=${params.roomId}`,
    'fc:frame:image': `https://huddle01-frames.vercel.app/api?roomId=${params.roomId}`,
    'fc:frame:button:1': 'Refresh Preview',
    'fc:frame:button:2': 'Join Meeting',
  };

  return {
    title: 'Huddle01 Frame',
    openGraph: {
      title: 'Huddle01 Meet',
      images: [
        'https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg',
      ],
    },
    other: {
      ...fcMetadata,
    },
    metadataBase: new URL('https://huddle01-frames.vercel.app/'),
  };
}

const Room = ({ params }: Props) => {
  return (
    <>
      <ShowPeers roomId={params.roomId} />
    </>
  );
};

export default Room;
