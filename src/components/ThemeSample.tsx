import THEMES from '../themes';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

export default function ThemeSample() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <div className=" h-full w-full flex-1 overflow-hidden bg-base-100 font-sans text-base-content">
      <div className="grid h-full grid-cols-5 grid-rows-3">
        <div className="col-start-1 row-span-2 row-start-1 border-b-2 border-r-2 border-accent bg-base-200"></div>
        <div className="col-start-1 row-start-3 border-r-2 border-accent"></div>
        <div className="col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-2 bg-base-100 p-2">
          <form
            action="theme"
            className="form-control flex h-auto justify-center"
          >
            <label
              htmlFor="theme-selector"
              className="label"
            >
              <span className="label-text">Select Theme:</span>
            </label>
            <select
              id="theme-selector"
              data-choose-theme
              className="select-bordered select"
            >
              {THEMES.map((t) => (
                <option
                  key={t}
                  value={t}
                >
                  {t}
                </option>
              ))}
            </select>
          </form>
          <h3 className="mt-2 text-2xl font-bold">Hello World!</h3>
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2">
            <div className="flex flex-1 items-center justify-center rounded bg-primary">
              <div className="text-sm font-bold text-primary-content">A</div>
            </div>
            <div className="flex flex-1 items-center justify-center rounded bg-secondary">
              <div className="text-sm font-bold text-secondary-content">A</div>
            </div>
            <div className="flex flex-1 items-center justify-center rounded bg-accent">
              <div className="text-sm font-bold text-accent-content">A</div>
            </div>
            <div className="flex flex-1 items-center justify-center rounded bg-neutral">
              <div className="text-sm font-bold text-neutral-content">A</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
