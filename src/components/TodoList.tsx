import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoListData = Todo[];

const getTodos = async () => fetch('/api/todos').then((res) => res.json());

const postTodo = async (data: Pick<Todo, 'text' | 'completed'>) =>
  fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const updateTodo = async (data: Todo) =>
  fetch(`/api/todos/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const deleteTodo = async (data: Pick<Todo, 'id'>) =>
  fetch(`/api/todos/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

function useTodos() {
  return useQuery<TodoListData>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
}

export default function TodoList() {
  const [text, setText] = useState('');

  const queryClient = useQueryClient();
  const { data, isLoading } = useTodos();

  const postTodoMt = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodoMt = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodoMt = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div className="card-body gap-2">
      <h2 className="card-title">Todo's</h2>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="flex flex-col gap-2">
          <ul className="flex max-h-[200px] flex-col gap-2 overflow-scroll">
            {data?.map((todo: Todo) => (
              <li
                className="flex flex-row items-center justify-between gap-2"
                key={todo.id}
              >
                <button
                  className={`btn flex-1 ${todo.completed && 'line-through'}`}
                  onClick={(e) =>
                    updateTodoMt.mutate({
                      ...todo,
                      completed: !todo.completed,
                    })
                  }
                >
                  {todo.text}
                </button>
                <button
                  className="h-[30px] w-[30px] rounded-full border border-accent transition hover:bg-secondary hover:text-accent"
                  onClick={(e) => deleteTodoMt.mutate({ id: todo.id })}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          <form
            className="flex flex-row items-center justify-between gap-1"
            onSubmit={(e) => {
              e.preventDefault();
              text?.length > 0 &&
                postTodoMt.mutate({
                  text,
                  completed: false,
                });
            }}
          >
            <input
              type="text"
              placeholder="New Todo"
              className="input-ghost input flex-1"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
            />
            <button
              type="submit"
              className="h-[30px] w-[30px] rounded-full border border-accent transition hover:bg-secondary hover:text-accent"
            >
              +
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
