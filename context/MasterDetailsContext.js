import { createContext, useState } from 'react';

export const MasterDetailsContext = createContext();

function MasterDetailsProvider({ children, defaultValue }) {
  const [masterDetails, setMasterDetails] = useState(defaultValue);

  return (
    <MasterDetailsContext.Provider value={{ masterDetails, setMasterDetails }}>
      {children}
    </MasterDetailsContext.Provider>
  );
}

export default MasterDetailsProvider;
