import { useCounter } from 'usehooks-ts';

function CounterButton({
  icon,
  label,
  buttonType,
  onClick,
}: {
  icon: JSX.Element;
  label: string;
  buttonType: string;
  onClick: () => void;
}) {
  return (
    <div className="group flex flex-col items-center justify-center transition">
      <button
        className={`btn-circle btn ${buttonType}`}
        onClick={() => onClick()}
      >
        {icon}
      </button>
      <span className="opacity-0 transition group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div className="card-body gap-4">
      <div className="card-title flex w-full flex-row items-start justify-center">
        <h2 className="flex-1">Count:</h2>
        <pre className="flex-1 text-center text-3xl">{count}</pre>
      </div>
      <div className="flex items-center justify-center gap-2">
        <CounterButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          }
          label="+1"
          buttonType="btn-accent"
          onClick={increment}
        />
        <CounterButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          }
          label="-1"
          buttonType="btn-primary"
          onClick={decrement}
        />
        <CounterButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          }
          label="reset"
          buttonType="btn-base"
          onClick={reset}
        />
      </div>
    </div>
  );
}
