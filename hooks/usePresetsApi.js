import useSWR from 'swr';

function usePresetsApi() {
  return useSWR('/api/presets');
}

export default usePresetsApi;
