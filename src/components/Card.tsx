export default function Card(props: React.PropsWithChildren) {
  return (
    <div className="card-bordered card card-normal flex flex-col gap-2 overflow-hidden border-2 border-accent bg-base-300 shadow-sm">
      {props.children}
    </div>
  );
}
