import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';
import credentialStore from '../stores/CredentialStore';

export const documentApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

documentApi.interceptors.request.use(function(config: AxiosRequestConfig) {
  try {
    // eslint-disable-next-line no-eval
    // const credential: Credential = eval(`(${localStorage.getItem('__bld__credential')})`);
    config.headers['Authorization'] = `Bearer ${credentialStore.access_token}`;
  } catch (error) {
    // Log this
  }

  return config;
});

export const getAll = (params: any = ''): AxiosPromise => {
  return documentApi.request({
    method: 'GET',
    url: '/api/documents',
    params,
  });
};

export const getDocument = (id: number): AxiosPromise => {
  return documentApi.request({
    method: 'GET',
    url: `/api/documents/${id}`,
  });
};

export const updateDocument = (id: number, document: any): AxiosPromise => {
  return documentApi.request({
    method: 'PATCH',
    url: `/api/documents/${id}`,
    data: {
      ...document,
    },
  });
};

export const borrowDocuments = (ids: string): AxiosPromise => {
  return documentApi.request({
    method: 'POST',
    url: '/api/borrowers/borrows',
    data: {
      ids,
    },
  });
};

export const returnDocuments = (ids: string): AxiosPromise => {
  return documentApi.request({
    method: 'PATCH',
    url: '/api/borrowers/returns',
    data: {
      ids,
    },
  });
};

export const confirmDocuments = (ids: string): AxiosPromise => {
  return documentApi.request({
    method: 'PATCH',
    url: '/api/borrowers/confirms',
    data: {
      ids,
    },
  });
};

export const deleteDocuments = (ids: string): AxiosPromise => {
  return documentApi.request({
    method: 'DELETE',
    url: '/api/documents',
    data: {
      ids,
    },
  });
};

export default {
  getAll,
  getDocument,
  updateDocument,
  borrowDocuments,
  returnDocuments,
  confirmDocuments,
  deleteDocuments,
};
