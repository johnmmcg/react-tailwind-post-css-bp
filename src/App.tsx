import ThemeSample from './components/ThemeSample';
import Card from './components/Card';
import Counter from './components/Counter';
import WindowSize from './components/WindowSize';
import TodoList from './components/TodoList';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start bg-base-100 p-4">
      <header>
        <h1 className="text-3xl">John's Sandbox</h1>
      </header>
      <div className="grid h-auto w-full max-w-4xl grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <WindowSize />
        </Card>
        <Card>
          <ThemeSample />
        </Card>
        <Card>
          <Counter />
        </Card>
        <Card>
          <Timer />
        </Card>
        <Card>
          <Stopwatch />
        </Card>
        <Card>
          <TodoList />
        </Card>
      </div>
    </div>
  );
}
