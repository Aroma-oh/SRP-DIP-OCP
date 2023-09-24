import { HttpClientInterface } from '../httpClient/httpClient';

export type Todo = {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number,
}

export interface TodoServiceInterface {
  get(): Promise<Todo[]>;
  create(todo: string): Promise<Todo>;
}

export class TodoService implements TodoServiceInterface {
  #httpClient;

  constructor(httpClient: HttpClientInterface) {
    this.#httpClient = httpClient;
  }

  async get() {
    const response = await this.#httpClient.fetch('todos', { method: 'GET' });

    return response.json();
  }
  async create(todo: string) {
    const response = await this.#httpClient.fetch('todos', {
      method: 'POST',
      body: JSON.stringify({ todo }),
    });

    return response.json();
  }
}