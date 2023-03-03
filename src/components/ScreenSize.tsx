import { useScreen } from 'usehooks-ts';

export default function ScreenSize() {
  const screen = useScreen();

  return (
    <div className="card-body">
      <h2 className="card-title">Window: </h2>
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <div className="stats shadow">
          <div className="stat">
            <p className="stat-tile">Width:</p>
            <p className="stat-value  text-xl">{screen?.width}px</p>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <p className="stat-tile">Height:</p>
            <p className="stat-value text-xl">{screen?.height}px</p>
          </div>
        </div>
      </div>
    </div>
  );
}
