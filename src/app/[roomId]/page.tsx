import ShowPeers from '@/components/ShowPeers';
import { Metadata } from 'next';

interface Props {
  params: { roomId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fcMetadata: Record<string, string> = {
    'fc:frame': 'vNext',
    'fc:frame:post_url': `https://7305-2409-40c1-500d-eb9a-31b9-b555-bc92-2b25.ngrok-free.app/api?roomId=${params.roomId}`,
    'fc:frame:image': `https://7305-2409-40c1-500d-eb9a-31b9-b555-bc92-2b25.ngrok-free.app/api?roomId=${params.roomId}`,
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
    metadataBase: new URL(
      'https://e46d-2409-40c1-1021-5794-3126-21db-2ed1-777e.ngrok-free.app'
    ),
  };
}

const Room = ({ params }: Props) => {
  return (
    <>
      <h1 className='text-white'>Room: {params.roomId}</h1>
    </>
  );
};

export default Room;
