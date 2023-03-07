import { useInterval } from 'usehooks-ts';
import React, { useState } from 'react';

export default function Timer() {
  const [inputValue, setInputValue] = useState<string>('01:00');
  const [count, setCount] = useState<number>(60000);
  const [last, setLast] = useState<number>(60000);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useInterval(
    () => {
      const newCount = count - 100;
      if (newCount > 0) setCount(count - 100);
      else {
        setIsPlaying(false);
        setCount(0);
      }
    },
    isPlaying ? 100 : null
  );

  const formatMS = (duration: number) => {
    let seconds: string | number = Math.floor((duration / 1000) % 60),
      minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);

    const leadingZero = (val: number) =>
      val > 9 ? val.toString() : '0' + val.toString();

    return leadingZero(minutes) + ':' + leadingZero(seconds);
  };

  const formatInputValue = (value: string): void => {
    let formattedValue = value.replace(/\D/g, '').slice(0, 10);
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + ':' + formattedValue.slice(2, 4);
    }
    setInputValue(formattedValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const [minutes, seconds] = inputValue.split(':');
    const totalMilliseconds =
      parseInt(minutes || '00', 10) * 60000 +
      parseInt(seconds || '00', 10) * 1000;
    setCount(totalMilliseconds);
    setLast(totalMilliseconds);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    formatInputValue(event.target.value);
  };

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <h2 className="card-title text-2xl">Timer: </h2>
      <div className="flex h-full w-full flex-row items-start justify-center gap-2">
        <div className="flex flex-col items-center justify-center">
          <span className="countdown font-mono text-5xl">
            <span style={{ '--value': formatMS(count).split(':')[0] }}></span>
          </span>
          min
        </div>
        <span className="font-mono text-5xl">:</span>
        <div className="flex flex-col items-center justify-center">
          <span className="countdown font-mono text-5xl">
            <span style={{ '--value': formatMS(count).split(':')[1] }}></span>
          </span>
          sec
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 pb-6">
        <div
          className="tooltip tooltip-bottom"
          data-tip={isPlaying ? 'stop' : 'start'}
        >
          <label
            className={`swap-rotate swap btn-accent btn-circle btn h-full ${
              count === 0 && 'opacity-50'
            }`}
          >
            <input
              type="checkbox"
              checked={isPlaying}
              onChange={() => setIsPlaying((cur) => !cur)}
              disabled={count === 0}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="swap-off h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="swap-on h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          </label>
        </div>
        <div
          className="tooltip tooltip-bottom"
          data-tip="reset"
        >
          <button
            className="btn-base btn-circle btn"
            onClick={() => {
              setCount(last);
            }}
            disabled={count === 0}
          >
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
          </button>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-2">
        {/* <h3 className="text-center font-mono text-2xl">{formatted}</h3> */}
        <form
          action="timer"
          onSubmit={handleSubmit}
          className="flex w-full flex-row items-center justify-center gap-2 text-center text-sm"
        >
          <div className="input-group justify-center">
            <input
              type="text"
              name="time"
              placeholder="00:00"
              className="input w-20 text-center"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="btn-primary btn"
              type="submit"
            >
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
