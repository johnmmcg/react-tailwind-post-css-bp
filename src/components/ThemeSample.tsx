export default function ThemeSample() {
  return (
    <div className=" h-full w-full flex-1 overflow-hidden bg-base-100 font-sans text-base-content">
      <div className="grid h-full grid-cols-5 grid-rows-3">
        <div className="col-start-1 row-span-2 row-start-1 border-b-2 border-r-2 border-accent bg-base-200"></div>
        <div className="col-start-1 row-start-3 border-r-2 border-accent"></div>
        <div className="col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-2 bg-base-100 p-4 ">
          <h3 className="text-2xl font-bold">Howdy!</h3>
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
