import ReactDOM from 'react-dom/client';
import App from './App';
import { HttpClient } from './httpClient/httpClient';
import { LocalStorage } from './storage/LocalStorage';
import { AuthService } from './services/AuthService';
import { AuthProvider } from './context/AuthContext';
import { TodoService } from './services/TodoService';
import { TodoProvider } from './context/TodoContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const REACT_APP_BASE_URL = 'https://www.pre-onboarding-selection-task.shop/';

const storage = new LocalStorage();
const httpClient = new HttpClient(REACT_APP_BASE_URL, storage);
const authService = new AuthService(httpClient, storage);
const todoService = new TodoService(httpClient);

root.render(
  <AuthProvider authService={authService}>
    <TodoProvider todoService={todoService}>
      <App />
    </TodoProvider>
  </AuthProvider>
);
