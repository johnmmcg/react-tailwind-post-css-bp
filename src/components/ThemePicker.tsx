import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import THEMES from '../themes';

export default function ThemePicker() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className="card-body">
      <h2 className="card-title">Select Theme: </h2>
      <form
        action="theme"
        className="form-control flex h-full justify-center"
      >
        <select
          data-choose-theme
          className="select"
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
    </div>
  );
}
