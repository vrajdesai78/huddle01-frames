import { PreviewPeer, previewPeersMetadata } from '@/utils/types';
import { Client } from '@huddle01/server-sdk/client';

const ShowPeers = ({ previewPeers }: previewPeersMetadata) => {
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

export default ShowPeers;
