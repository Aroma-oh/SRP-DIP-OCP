import { StorageInterface } from './Interface';

export class LocalStorage implements StorageInterface {
  #key;

  constructor() {
    this.#key = 'ACCESS_TOKEN';
  }
  save(token: string) {
    localStorage.setItem(this.#key, token);
  }
  get() {
    return localStorage.getItem(this.#key)
  }
  delete() {
    localStorage.removeItem(this.#key)
  }

}