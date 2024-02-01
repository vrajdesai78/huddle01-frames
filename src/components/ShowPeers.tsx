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
      <span className='font-bold mt-4'>Huddle01</span>
      <div className='flex-wrap flex items-center justify-center gap-4 w-full m-6'>
        {peersMetadata.map((peer) => (
          <div
            className='flex flex-col text-center gap-1'
            key={peer.displayName}
          >
            <div className='flex items-center justify-center text-3xl font-semibold w-24 h-24 rounded-full bg-gray-800'>
              {peer.displayName[0].toUpperCase()}
            </div>
            <h1>{peer.displayName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPeers;
