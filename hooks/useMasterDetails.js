import { MasterDetailsContext } from '@/context/MasterDetailsContext';
import { useContext } from 'react';

function useMasterDetails() {
  return useContext(MasterDetailsContext);
}

export default useMasterDetails;
