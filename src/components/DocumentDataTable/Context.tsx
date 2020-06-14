import React from 'react';
import {useLocalStore} from 'mobx-react';
import documentApi from '../../apis/documents';
import {AxiosResponse} from 'axios';
import {Document} from './index';
import {decorate, observable, action, runInAction} from 'mobx';

import {DocumentResource} from '../../containers/DocumentsPage';

class DocumentsStore {
  data: DocumentResource = {} as DocumentResource;

  loading: boolean = false;

  refresh() {
    this.loading = true;
    documentApi.getAll()
        .then((response: AxiosResponse) => {
          runInAction(() => {
            this.data = observable(response.data);
            this.loading = false;
          });
        })
        .catch(() => {
          runInAction(() => {
            this.loading = false;
          });
        });
  }
}

decorate(DocumentsStore, {
  data: observable,
  loading: observable,
  refresh: action.bound,
});

const documentsStore = new DocumentsStore();

export const DocumentsContext = React.createContext({} as DocumentsStore);

export const DocumentsProvider: React.FC<{}> = ({children}) => {
  const store = documentsStore;
  return (
    <DocumentsContext.Provider value={store}>
      {children}
    </DocumentsContext.Provider>
  );
};
