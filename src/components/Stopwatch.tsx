import { useInterval } from 'usehooks-ts';
import { useState } from 'react';

export default function Stopwatch() {
  const [count, setCount] = useState<number>(0);
  const [laps, setLaps] = useState<string[]>([]);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useInterval(() => setCount(count + 100), isPlaying ? 100 : null);

  const useMsToTime = () => {
    let duration = count;

    let milliseconds: string | number = Math.floor((duration % 1000) / 100),
      seconds: string | number = Math.floor((duration / 1000) % 60),
      minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return {
      minutes,
      seconds,
      milliseconds,
      formatted: minutes + ':' + seconds + '.' + milliseconds,
    };
  };

  const { minutes, seconds, milliseconds, formatted } = useMsToTime();

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <h2 className="card-title text-2xl">Stopwatch: </h2>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex w-max flex-col items-start justify-center gap-1 self-center border p-4 text-center text-xs lg:gap-2">
          <div className="flex w-full flex-row">
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">{minutes}</span>
              min
            </div>
            <span className="font-mono text-2xl">:</span>
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">{seconds}</span>
              sec
            </div>
            <span className="font-mono text-2xl">.</span>
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">
                {milliseconds}
              </span>
              ms
            </div>
          </div>
          <div className="max-h-[75px] w-full overflow-scroll font-mono">
            {laps.length > 0 && <h3 className="underline">Laps</h3>}
            <ul className="flex w-full flex-col items-center">
              {laps?.map((lap, i) => (
                <li key={i}>
                  #{laps.length - i} - {lap}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 pb-6">
          <div
            className="tooltip tooltip-bottom"
            data-tip={isPlaying ? 'stop' : 'start'}
          >
            <label className="swap-rotate swap btn-accent btn-circle btn h-full">
              <input
                type="checkbox"
                checked={isPlaying}
                onChange={() => setPlaying((cur) => !cur)}
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
            data-tip="lap"
          >
            <button
              className="btn-secondary btn-circle btn"
              disabled={count === 0}
              onClick={() => {
                if (count !== 0) {
                  setLaps((cur) => {
                    let prev = [...cur];
                    prev.unshift(formatted);
                    return prev;
                  });
                }
              }}
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div
            className="tooltip tooltip-bottom"
            data-tip="reset"
          >
            <button
              className="btn-base btn-circle btn"
              onClick={() => {
                setLaps([]);
                setCount(0);
              }}
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
      </div>
    </div>
  );
}
