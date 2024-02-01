import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const fcMetadata: Record<string, string> = {
    'fc:frame': 'vNext',
    'fc:frame:post_url': 'https://huddle01.com',
    'fc:frame:image':
      'https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg',
    'fc:frame:button:1': 'Join Meeting',
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
    metadataBase: new URL('https://huddle01-frames.vercel.app'),
  };
}

export default function Home() {
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
