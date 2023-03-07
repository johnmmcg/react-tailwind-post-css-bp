import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

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
  const ulRef = useRef<HTMLUListElement | null>(null);

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
    <div className="flex h-full w-full flex-col gap-2 p-4">
      <h2 className="card-title">Todo List:</h2>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="flex h-full flex-col justify-between gap-2">
          <ul
            className="flex max-h-[200px] flex-1 flex-col gap-2 overflow-scroll"
            ref={ulRef}
          >
            {data
              ?.map((todo: Todo) => (
                <li
                  className="flex flex-row items-center justify-between gap-2"
                  key={todo.id}
                >
                  <button
                    className={`btn flex-1 ${
                      todo.completed && 'line-through opacity-50'
                    }`}
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
                    className="m-0 flex h-[36px] w-[36px] items-center justify-center rounded-full border border-accent p-0 transition hover:bg-accent hover:text-base-100 "
                    onClick={(e) => deleteTodoMt.mutate({ id: todo.id })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))
              .reverse()}
          </ul>
          <div className="flex w-full">
            <form
              className="flex w-full flex-row items-center justify-between gap-2"
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
                className="input-ghost input m-0 min-w-0 border border-accent-focus p-0 pl-2 focus:outline-offset-0"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />
              <button
                type="submit"
                className="flex h-[36px] min-w-[36px] items-center justify-center rounded-full border border-accent p-0 transition hover:bg-accent hover:text-base-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
