import { PreviewPeer, previewPeersMetadata } from '@/utils/types';
import { Client } from '@huddle01/server-sdk/client';

const ShowPeers = ({ previewPeers }: previewPeersMetadata) => {
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
      <span tw='font-bold mt-4'>Huddle01</span>
      <div tw='flex-wrap flex items-center justify-center gap-4 w-full m-6'>
        {previewPeers.map((peer) => (
          <div tw='flex flex-col text-center gap-1' key={peer.displayName}>
            <img
              width={100}
              height={100}
              src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%20width='80px'%20height='80px'%20style='shape-rendering:geometricPrecision;%20text-rendering:geometricPrecision;%20image-rendering:optimizeQuality;%20fill-rule:evenodd;%20clip-rule:evenodd'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cpath%20style='opacity:0.993'%20fill='%2323262f'%20d='M%2024.5,-0.5%20C%2034.1667,-0.5%2043.8333,-0.5%2053.5,-0.5C%2057.6531,1.16657%2061.4864,3.4999%2065,6.5%20C%2070.1146,15.0676%2074.9479,23.7342%2079.5,32.5%20C%2079.5,36.8333%2079.5,41.1667%2079.5,45.5%20C%2075.0951,55.4718%2069.7618,64.9718%2063.5,74%20C%2060.4362,75.8588%2057.4362,77.6921%2054.5,79.5%20C%2044.8333,79.5%2035.1667,79.5%2025.5,79.5%20C%2021.3469,77.8334%2017.5136,75.5001%2014,72.5%20C%208.88542,63.9324%204.05209,55.2658%20-0.5,46.5%20C%20-0.5,42.1667%20-0.5,37.8333%20-0.5,33.5%20C%203.90486,23.5282%209.23819,14.0282%2015.5,5%20C%2018.5638,3.1412%2021.5638,1.30787%2024.5,-0.5%20Z'%20/%3E%3C/g%3E%3Cg%3E%3Cpath%20style='opacity:1'%20fill='%235c6b80'%20d='M%2035.5,22.5%20C%2045.6591,21.1581%2049.8257,25.4914%2048,35.5%20C%2045.1034,40.1549%2040.9367,41.6549%2035.5,40%20C%2030.8451,37.1034%2029.3451,32.9367%2031,27.5%20C%2032.025,25.313%2033.525,23.6464%2035.5,22.5%20Z'%20/%3E%3C/g%3E%3Cg%3E%3Cpath%20style='opacity:1'%20fill='%23252933'%20d='M%2035.5,25.5%20C%2045.4874,24.3319%2048.154,28.1653%2043.5,37%20C%2037.7612,39.464%2034.0945,37.6307%2032.5,31.5%20C%2032.9837,29.1992%2033.9837,27.1992%2035.5,25.5%20Z'%20/%3E%3C/g%3E%3Cg%3E%3Cpath%20style='opacity:1'%20fill='%235d6b81'%20d='M%2033.5,45.5%20C%2042.8019,43.8213%2050.4686,46.488%2056.5,53.5%20C%2056,53.8333%2055.5,54.1667%2055,54.5%20C%2048.5343,48.8846%2041.0343,47.0512%2032.5,49%20C%2029.387,50.4548%2026.5537,52.2882%2024,54.5%20C%2023.5,54.1667%2023,53.8333%2022.5,53.5%20C%2025.6468,50.0055%2029.3135,47.3388%2033.5,45.5%20Z'%20/%3E%3C/g%3E%3C/svg%3E"
            />
            <h1>{peer.displayName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPeers;
