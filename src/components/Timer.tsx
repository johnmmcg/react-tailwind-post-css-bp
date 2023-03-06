import { useInterval } from 'usehooks-ts';
import { useMemo, useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState<number>(0);
  const [direction, setDirection] = useState<'Up' | 'Down'>('Up');
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const isDirectionUp = direction === 'Up';

  useInterval(
    () => (isDirectionUp ? setCount(count + 100) : setCount(count - 100)),
    isPlaying ? 100 : null
  );

  const useMsToTime = () =>
    useMemo(() => {
      let duration = count;
      let isNegative = false;
      if (duration < 0) {
        duration = Math.abs(duration);
        isNegative = true;
      }

      let milliseconds: string | number = Math.floor((duration % 1000) / 100),
        seconds: string | number = Math.floor((duration / 1000) % 60),
        minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
        hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      return {
        hours,
        minutes,
        seconds,
        milliseconds,
        isNegative,
        formatted:
          (isNegative ? '-' : '') +
          hours +
          ':' +
          minutes +
          ':' +
          seconds +
          '.' +
          milliseconds,
      };
    }, [count]);

  const { formatted } = useMsToTime();

  return (
    <div className="card-body gap-4">
      <h2 className="text-2xl">Timer: </h2>
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <h3 className="text-center font-mono text-2xl">{formatted}</h3>
        <button
          onClick={() => setDirection((cur) => (isDirectionUp ? 'Down' : 'Up'))}
          className={`btn-circle btn rotate-0 transition ${
            !isDirectionUp && 'rotate-180'
          }`}
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
              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <button
        className="btn"
        onClick={() => setPlaying(!isPlaying)}
      >
        {isPlaying ? 'Stop' : 'Start'}
      </button>
      <button
        className="btn"
        onClick={() => setCount(0)}
      >
        Reset
      </button>
    </div>
  );
}
