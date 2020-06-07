import React, {createContext, useContext} from 'react';
import credentialStore, {CredentialStore} from '../stores/CredentialStore';

export const CredentialStoreContext = createContext({} as CredentialStore);

export const CredentialStoreProvider: React.FC<{}> = ({children}) => {
  const store = credentialStore;

  return (
    <CredentialStoreContext.Provider value={store}>
      {children}
    </CredentialStoreContext.Provider>
  );
};

export const useCredentialStore = (): CredentialStore => useContext(CredentialStoreContext);
