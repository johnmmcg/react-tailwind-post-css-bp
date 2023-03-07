import React from 'react';
import { useCounter } from 'usehooks-ts';

function CounterButton({
  icon,
  label,
  buttonType,
  disabled,
  onClick,
}: React.PropsWithChildren & {
  icon: JSX.Element;
  label: string;
  buttonType: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="group flex flex-col items-center justify-center transition">
      <div
        className="tooltip tooltip-bottom"
        data-tip={label}
      >
        <button
          className={`btn-circle btn ${buttonType}`}
          onClick={() => onClick()}
          disabled={disabled}
        >
          {icon}
        </button>
      </div>
    </div>
  );
}

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div className="flex h-full flex-col items-center gap-4 p-4">
      <div className="card-title flex w-full flex-row items-start justify-center">
        <h2 className="flex-1 text-2xl">Count:</h2>
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex h-[70px] w-[90px] items-center justify-center border border-accent">
          <span className="countdown h-full font-mono text-[70px]">
            <span
              style={{ '--value': count }}
              className="h-full overflow-hidden"
            ></span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 pb-6">
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
            disabled={count === 99}
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
            disabled={count === 0}
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
    </div>
  );
}
