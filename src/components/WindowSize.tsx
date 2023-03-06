import { useWindowSize } from 'usehooks-ts';

export default function WindowSize() {
  const { width, height } = useWindowSize();

  return (
    <div className="card-body">
      <h2 className="card-title">Window: </h2>
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <div className="stats shadow">
          <div className="stat">
            <p className="stat-tile">Width:</p>
            <p className="stat-value  text-xl">{width}px</p>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <p className="stat-tile">Height:</p>
            <p className="stat-value text-xl">{height}px</p>
          </div>
        </div>
        <div>
          <h2 className="block sm:hidden">Small Only</h2>
          <h2 className="hidden sm:block lg:hidden">Medium Only</h2>
          <h2 className="hidden lg:block xl:invisible">Large Only</h2>
          <h2 className="hidden xl:block 2xl:hidden">Extra Large Only</h2>
          <h2 className="hidden 2xl:block">Double Extra Large Only</h2>
        </div>
      </div>
    </div>
  );
}
