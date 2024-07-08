
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import {
  saveItemToColumn,
  saveIsAddingNewItem,
  saveCurrentDraggedTask,
} from '../redux/features/task-board-slice';
import { v4 as uuidv4 } from 'uuid';
import { GRID_COLUMNS_LIST } from '../utils/constants';
import { useState } from 'react';
import Alert from './Alert';

function checkForExistingTask(taskTitle, tasks) {
  const checkTitle = (v) => v.title === taskTitle;
  for (const column of GRID_COLUMNS_LIST) {
    if (tasks[column.toLowerCase()].find(checkTitle)) {
      return true;
    }
  }
  return false;
}

export default function AddTaskForm() {
  const dispatch = useAppDispatch();
  const taskBoardState = useAppSelector((state) => state.taskBoard);
  const [hasError, setHasError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (checkForExistingTask(formJson.title, taskBoardState)) {
      setHasError(true);
    } else {
      formatAndSaveLabels(formJson);
      formJson.date = new Date().getTime();
      formJson.id = uuidv4();

      dispatch(saveCurrentDraggedTask(formJson));
      dispatch(saveItemToColumn({
        task: formJson,
        toColumn: formJson.status
      }));
      dispatch(saveIsAddingNewItem(false));
      setHasError(false);

      form.reset();
    }
  }

  return (
    <>
      <Alert
        show={hasError}
        text='Error! A task with that title already exists'
        onClick={() => setHasError(!hasError)}
      />
      <form
        className='w-full '
        method="get"
        onSubmit={handleSubmit}
        name="add-task"
      >
        <label className= " md:text-[16px] xtte-[10px] ">
          Title <input className="block w-full px-3 py-2 text-black border-2 border-gray-700 rounded-md" type="text" name="title" required />
        </label>
        <label  className= "b md:text-[16px] xtte-[10px]">
          Description <br /><textarea className="block w-full px-3 py-2 text-black border-2 border-gray-700 rounded-md resize-none" name="desc" />
        </label>
        <label  className= "bmd:text-[16px] xtte-[10px]">
          Labels <br /><input className='px-3 py-2 text-black border-2 border-gray-700 rounded-md' type="text" name="labels" title="Provide a list of comma separated labels" />
        </label >
        <label className= "block md:text-[16px] xtte-[10px]">Status</label>
        <div>
          <input className='md:text-[16px] text-[10px]' type="radio" value="todo" name="status" id="todo-status-radio-btn" defaultChecked />
          <label htmlFor="todo-status-radio-btn md:text-[16px] xtte-[10px]">Todo</label>
        </div>
        <div>
          <input type="radio" value="in-progress" name="status" id="in-progress-status-radio-btn" />
          <label htmlFor="in-progress-status-radio-btn md:text-[16px] text-[10px]">In-Progress</label>
        </div>
        <div>
          <input type="radio" value="in-review" name="status" id="in-review-status-radio-btn" />
          <label htmlFor="in-review-status-radio-btn md:text-[16px] xtte-[10px]">In-Review</label>
        </div>
        <div>
          <input type="radio" value="completed" name="status" id="completed-status-radio-btn" />
          <label htmlFor="completed-status-radio-btn md:text-[16px] xtte-[10px]">Completed</label>
        </div>
        <div className="gap-4 mt-4 add-task-form-btns">
          <button
            className="px-3 py-2 bg-green-700 rounded-md outline-none submit-btn add-task-btn hover:bg-green-900"
            type="submit"
          >
            Create Task
        </button>
          <button className="px-3 py-2 ml-2 bg-red-700 rounded-md outline-none reset-btn add-task-btn hover:bg-red-900" type="reset">Reset</button>
        </div>
      </form>
    </>
  )
}

function formatAndSaveLabels(formJson) {
  const labelStr = formJson.labels.trim();
  if (!labelStr || labelStr === '') return;
  formJson.labels = labelStr.split(',').map(l => l.trim());
}
