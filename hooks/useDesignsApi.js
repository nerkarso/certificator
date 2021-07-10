import useSWR from 'swr';

function useDesignsApi() {
  return useSWR('/api/designs');
}

export default useDesignsApi;
