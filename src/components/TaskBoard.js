import { GRID_LABELS } from '../utils/constants';
import Column from './Column';


export default function TaskBoard() {
  return (
    <>
      <div className="justify-between mx-2 mt-10 text-black rounded-md md:gap-4 md:mx-20 md:flex">
        {GRID_LABELS.map((column, i) => {
          return (
            <Column
              key={i}
              column={column}
            />
          );
        })}
      </div>
    </>
  );
}
