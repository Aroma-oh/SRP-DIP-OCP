export interface StorageInterface {
  save(token: string): void;
  get(): string | null;
  delete(): void;
}