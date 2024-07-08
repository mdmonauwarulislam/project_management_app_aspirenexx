import TaskBoard from './components/TaskBoard';
import Header from './components/Header';
import { useAppDispatch } from './redux/app/hooks';
import { getStoredTaskBoard } from './utils/localStorage';
import { saveBoard } from './redux/features/task-board-slice';
import Footer from './components/Footer';

function App() {
  const dispatch = useAppDispatch();
  const existingTasks = getStoredTaskBoard();

  if (existingTasks) {
    dispatch(saveBoard(existingTasks));
  }
  
  return (
    <div className="h-screen overflow-y-auto text-white task-board-app bg-zinc-900">
      <Header />
      <TaskBoard />
      <Footer />
    </div>
  );
}

export default App;
