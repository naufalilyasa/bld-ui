import {decorate, observable, action, runInAction, computed, reaction} from 'mobx';
import serialize from 'serialize-javascript';
import {AxiosResponse, AxiosError} from 'axios';
import Swal from 'sweetalert2';
import {History} from 'history';

import authApi from '../apis/auth';

/* eslint-disable camelcase */
export interface Credential {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface RegistrationErrorResponse {
  errors: {
    email?: Array<string>,
    password?: Array<string>,
    confirm_password?: Array<string>,
    name?: Array<string>,
    registration_number?: Array<string>,
    phone_number?: Array<string>,
    address?: Array<string>,
  },
  message: string;
}

export interface RegistrationResponse {
  message: string;
}

export interface User {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  registration_number: string;
  phone_number: string;
  address: string;
}

export class CredentialStore implements Credential {
  access_token: string = '';
  token_type: string = '';
  expires_in: number = 0;

  isLoading: boolean = false;
  isSuccess: boolean = false;
  isFailure: boolean = false;

  saveHandler: any = null;

  constructor() {
    this.loadFromLocalStorage();

    this.saveHandler = reaction(() => this.asJson, (json) => {
      localStorage.setItem('__bld__credential', serialize(json));
    });
  }

  loadFromLocalStorage() {
    const credentialSerialized: string | null = localStorage.getItem('__bld__credential');

    if (!credentialSerialized) return;

    try {
      // eslint-disable-next-line no-eval
      const credential: Credential = eval(`(${credentialSerialized})`);

      this.access_token = credential.access_token;
      this.token_type = credential.token_type;
      this.expires_in = credential.expires_in;
    } catch (error) {
      return;
    }
  }

  get isAuthenticated(): boolean {
    if (!this.access_token) return false;

    try {
      const payload = JSON.parse(atob(this.access_token.split('.')[1]));
      const now: Date = new Date();
      const exp: Date = new Date(payload.exp * 1000);

      if (now >= exp) return false;

      return true;
    } catch (error) {
      return false;
    }
  }

  get permissions(): Array<string> {
    if (!this.access_token) return [];

    try {
      const payload = JSON.parse(atob(this.access_token.split('.')[1]));

      return payload.permissions || [];
    } catch (error) {
      return [];
    }
  }

  login(email: string, password: string) {
    this.isLoading = true;

    authApi.login(email, password)
        .then((response: AxiosResponse) => {
          const {data}: { data: Credential} = response;

          runInAction(() => {
            this.access_token = data.access_token;
            this.token_type = data.token_type;
            this.expires_in = data.expires_in;

            this.isLoading = false;
          });
        })
        .catch((error: AxiosError) => {
          runInAction(() => {
            this.isLoading = false;
          });
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something happened',
          });
        });
  }

  register(user: User, history: History) {
    this.isLoading = true;
    this.isSuccess = false;
    this.isFailure = false;

    authApi.register(user)
        .then((response: AxiosResponse) => {
          const {data}: { data: RegistrationResponse} = response;

          Swal.fire({
            icon: 'success',
            text: data.message,
          }).then(() => history.push('/auth/signin'));

          runInAction(() => {
            this.isLoading = false;
            this.isSuccess = true;
            this.isFailure = false;
          });
        })
        .catch((error: AxiosError) => {
          const errorData: RegistrationErrorResponse = error.response?.data;
          const html: string =
            Object.keys(errorData.errors)
                // TODO: DON'T DO THIS!
                // @ts-ignore
                .map((key: string): string[] => errorData.errors[key])
                .reduce((prev: string[], next: string[]) => [prev.join('<br/>') + '<br/>' + next.join('<br/>')])[0];

          Swal.fire({
            icon: 'error',
            title: 'Error',
            html,
          });
          runInAction(() => {
            this.isLoading = false;
            this.isSuccess = false;
            this.isFailure = true;
          });
        });
  }

  logout() {
    this.access_token = '';
    this.token_type = '';
    this.expires_in = 0;
  }

  get asJson() {
    return {
      access_token: this.access_token,
      token_type: this.token_type,
      expires_in: this.expires_in,
    };
  }
}

decorate(CredentialStore, {
  access_token: observable,
  token_type: observable,
  expires_in: observable,
  isLoading: observable,
  permissions: computed,
  isAuthenticated: computed,
  loadFromLocalStorage: action.bound,
  login: action.bound,
  logout: action.bound,
  asJson: computed,
});

const credentialStore = new CredentialStore();

export default credentialStore;
