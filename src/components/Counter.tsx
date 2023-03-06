import { useCounter } from 'usehooks-ts';

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div className="card-body gap-4">
      <div className="card-title flex w-full flex-row items-start justify-center">
        <h2 className="flex-1">Count:</h2>
        <pre className="flex-1 text-center text-3xl">{count}</pre>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className="btn-accent btn-circle btn"
          onClick={() => increment()}
        >
          +
        </button>
        <button
          className="btn-secondary btn-circle btn"
          onClick={() => decrement()}
        >
          -
        </button>
        <button
          className="btn-primary btn-circle btn"
          onClick={() => reset()}
        >
          ~
        </button>
      </div>
    </div>
  );
}
