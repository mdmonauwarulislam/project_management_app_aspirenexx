import { useDrag } from 'react-dnd';
import { ITEM_TYPE } from '../utils/constants';
import { useAppDispatch } from '../redux/app/hooks';
import { saveCurrentDraggedTask, saveIsExpandingTask } from '../redux/features/task-board-slice';
import { isValidArray } from '../utils/helpers';


export default function Task({ task, children }) {
  const dispatch = useAppDispatch();
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ITEM_TYPE.TASK,
      item: { task },
      collect: (monitor) => ({
        isDragging: Boolean(monitor.isDragging()),
      }),
    }),
    []
  );

  if (!task) {
    return '';
  }

  const { title, desc, labels} = task;

  return (
    <div
      ref={dragRef}
      className='px-4 mt-2 text-black bg-white border-2 border-gray-700 rounded'
      tabIndex={0}
      style={{
        cursor: isDragging && 'move',
        visibility: isDragging && 'hidden'
      }}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          dispatch(saveIsExpandingTask(true));
          dispatch(saveCurrentDraggedTask(task));
        }
      }}
      onClick={() => {
        dispatch(saveIsExpandingTask(true));
        dispatch(saveCurrentDraggedTask(task));
      }}
      onDragStart={() => {
        dispatch(saveCurrentDraggedTask(task));
      }}
    >
      <Title title={title} controls={children} />
      <Description desc={desc} />
      <Labels labels={labels} />
    </div>
  );
}

function Title({ title, controls }) {
  return (
    <div className="task__header">
      <span className="font-bold task__title text-[22px]" >
        {title}
      </span>
      {controls}
    </div>
  );
}

function Description({ desc }) {
  if (!desc) return '';
  let truncated = '';
  if (desc.length > 80) {
    truncated = desc.slice(0, 80) + '...';
  }
  return (
    <p className="font-normal text-[16px] task__desc">
      {truncated || desc}
    </p>
  );
}

export function Labels({ labels }) {
  if (!isValidArray(labels)) return '';
  return (
    <ul className="flex justify-center w-24 px-2 py-1 my-2 border border-gray-700 rounded task__labels">
      {labels?.map((label, i) => {
        return (
          <li key={i}>{label}</li>
        )
      })}
    </ul>
  )
}
