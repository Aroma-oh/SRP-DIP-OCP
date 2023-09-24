import { StorageInterface } from '../storage/Interface';

type Options = {
  method: string;
  body?: string;
  headers?: Record<string, string>;
};

export interface HttpClientInterface {
  fetch(endPoint: string, options: Options): Promise<Response>;
}

export class HttpClient implements HttpClientInterface {
  #baseURL;
  #storage;

  constructor(baseURL: string, storage: StorageInterface) {
    this.#baseURL = baseURL;
    this.#storage = storage;
  }

  async fetch(endPoint: string, options: Options): Promise<Response> {
    const authToken = this.#storage.get();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: authToken ? 'Bearer ' + authToken : '',
      ...options.headers,
    };

    const response = await window.fetch(this.#baseURL + endPoint, {
      ...options,
      headers,
    });

    if (response.ok) {
      return response;
    } else {
      throw response.statusText;
    }
  }
}
