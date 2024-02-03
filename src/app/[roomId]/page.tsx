import { Metadata } from 'next';

interface Props {
  params: { roomId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fcMetadata: Record<string, string> = {
    'fc:frame': 'vNext',
    'fc:frame:post_url': `${process.env.HOST_URL}/join?roomId=${params.roomId}`,
    'fc:frame:image': `${process.env.HOST_URL}/preview?roomId=${params.roomId}`,
    'fc:frame:button:1': 'Refresh Preview',
    'fc:frame:button:2': 'Join Meeting',
    'fc:frame:button:2:action': 'post_redirect',
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
    metadataBase: new URL(`${process.env.HOST_URL}`),
  };
}

const Room = ({ params }: Props) => {
  const peersMetadata = [
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

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '3rem',
          marginTop: '1rem',
          color: 'white',
        }}
      >
        Huddle01
      </span>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          margin: '1.5rem',
        }}
      >
        {peersMetadata.map((peer) => (
          <div
            key={peer.displayName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              gap: '0.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                width: '6rem',
                height: '6rem',
                borderRadius: '50%',
                color: 'white',
                backgroundColor: '#2d2d2d',
              }}
            >
              {peer.displayName[0].toUpperCase()}
            </div>
            <span style={{ color: 'white' }}>{peer.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
