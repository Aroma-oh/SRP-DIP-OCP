import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Todo, TodoServiceInterface } from '../services/TodoService';

type TodoProviderType = {
  children: ReactNode;
  todoService: TodoServiceInterface;
};

interface TodoContextInterface {
  todos: Todo[];
  createTodo: (todo: string) => void;
}

const TodoContext = createContext<TodoContextInterface | null>(null);

export const useTodo = () => useContext(TodoContext);

export function TodoProvider({ children, todoService }: TodoProviderType) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todoService.get().then((todos) => setTodos(todos));
  }, [todoService, setTodos])

  function createTodo(todo: string) {
    todoService.create(todo).then((newTodo) => setTodos((prev) => [...prev, newTodo]))
  }

  return (
    <TodoContext.Provider
      value={{ todos, createTodo }}>
      {children}
    </TodoContext.Provider>
  )
}