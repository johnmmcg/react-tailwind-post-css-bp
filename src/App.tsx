import ThemeSample from './components/ThemeSample';
import Card from './components/Card';
import Counter from './components/Counter';
import ScreenSize from './components/ScreenSize';
import ThemePicker from './components/ThemePicker';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <div className="h-screen w-screen bg-base-100">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <ThemePicker />
          </Card>
          <Card>
            <ThemeSample />
          </Card>
          <Card>
            <ScreenSize />
          </Card>
          <Card>
            <Counter />
          </Card>
          <Card>
            <TodoList />
          </Card>
        </div>
      </div>
    </div>
  );
}
