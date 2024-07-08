import { useAppDispatch } from "../redux/app/hooks";
import { saveSortBy } from "../redux/features/task-board-slice";

export default function SortActions() {
    const dispatch = useAppDispatch();

    return (
        <select className="px-3 py-2 text-black rounded-md" id="column-sort-actions" onChange={(e) => {
            dispatch(saveSortBy(e.target.value));
        }}>
            <option className="px-3 py-2" value="">Sort By</option>
            <option className="px-3 py-2" value="name">Name</option>
            <option className="px-3 py-2" value="created-at">Created At</option>
            <option className="px-3 py-2" value="last-updated">Last Updated</option>
        </select>
    );
}
