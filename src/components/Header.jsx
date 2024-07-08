import { saveIsAddingNewItem, clearBoard, clearLocalStorage } from "../redux/features/task-board-slice";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import AddTaskForm from "./AddTaskForm";
import Modal from "./Modal";
import Search from "./Search";
import { SiTodoist } from "react-icons/si";

import SaveFile from "./SaveFile";
import SortActions from "./SortActions";

export default function Header() {
  const taskBoardState = useAppSelector(state => state.taskBoard);
  const dispatch = useAppDispatch();

  return (
    <div className="">
      <div className="flex items-center justify-center md:text-[60px] text-[22px] md:mx-auto mx-4 pt-4">
        <div className="text-white ">
          <SiTodoist />

        </div>
        <h1 className="ml-8">PROJECT MANAGEMENT APP</h1>

      </div>
      <div className="items-start justify-between w-full mx-4 mt-10 header-inputs md:flex md:mx-20">
        <div className="items-start w-full md:w-1/2 md:flex">
        <Modal
          content={<AddTaskForm />}
          className = "w-full"
          isOpen={taskBoardState.isAddingNewItem}
          title="Add Task"
          clickEffect={(isOpen) => dispatch(saveIsAddingNewItem(!isOpen))}
        />
        <div className="flex gap-2 md:text-[14px] text-[12px]  md:w-1/2 w-full mt-4 md:mt-0">
          <button
            title="Add Task"
            onClick={() => {
              dispatch(saveIsAddingNewItem(true));
            }}
            className="px-3 py-2 bg-green-700 rounded-md outline-none add-task-btn hover:bg-green-900"
          >
            <span>+</span> New Task
          </button>
          <button
            title="Clear task"
            className="px-3 py-2 text-black bg-white border-2 border-gray-700 rounded-md outline-none light-control-btn hover:bg-red-100"
            onClick={() => {
              dispatch(clearBoard());
              dispatch(clearLocalStorage());
            }}
          >
            Clear
          </button>
          <SaveFile />
        </div>
          </div>

        <div className ="w-full md:flex justify-evenly md:w-1/2">
        
        <div className="mt-4 md:ml-8 controls md:mt-0">
          <Search />
          <SortActions />
        </div>
          </div>

       
      </div>
    </div>
  );
}
