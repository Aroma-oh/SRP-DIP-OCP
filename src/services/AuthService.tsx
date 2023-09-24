import { HttpClientInterface } from '../httpClient/httpClient';
import { StorageInterface } from '../storage/Interface';

export interface AuthServiceInterface {
  signin(email: string, password: string): Promise<void>;
  signup(email: string, password: string): Promise<void>;
  logout(): void;
}

export class AuthService implements AuthServiceInterface {
  #httpClient;
  #storage;

  constructor(httpClient: HttpClientInterface, storage: StorageInterface) {
    this.#httpClient = httpClient;
    this.#storage = storage;
  }

  async signin(email: string, password: string) {
    const response = await this.#httpClient.fetch('auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    const { access_token } = await response.json();

    this.#storage.save(access_token);
  }

  async signup(email: string, password: string) {
    console.log(email, password)
    console.log(typeof email);

    this.#httpClient.fetch('auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

  }

  logout() {
    this.#storage.delete();
  }
}