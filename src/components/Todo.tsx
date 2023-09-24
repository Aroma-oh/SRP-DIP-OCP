import { ChangeEvent, useState } from 'react';
import { useTodo } from '../context/TodoContext';

const Todo = () => {
  const [newTodo, setNewTodo] = useState('');

  const saveUserInput = (e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)

  const todo = useTodo();
  if (!todo) return <div>Something is wrong</div>;

  const { todos, createTodo } = todo;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo(newTodo);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={newTodo} name='todo' type="text" onChange={saveUserInput} />
      <button type="submit">추가</button>
      {todos?.map(({ id, todo }) => (
        <li key={id}>{todo}</li>
      ))}
    </form>
  );
};

export default Todo;