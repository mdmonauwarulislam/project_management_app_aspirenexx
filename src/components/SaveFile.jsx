import { useAppSelector } from "../redux/app/hooks"

export default function SaveFile() {
  const taskBoardState = useAppSelector(state => state.taskBoard);
  const str = JSON.stringify(taskBoardState, null, 2);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8"
  });

  const saveFile = async (blob) => {
    try {
      const handle = await window.showSaveFilePicker({
        startIn: 'downloads',
        suggestedName: 'tasks-' + new Date().getTime() + '.json',
        types: [{
          accept: {
            "application/json": ['.json']
          },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return handle;
    } catch (err) {
      console.error(err.name, err.message);
    }
  };

  return (
    <button
      title="save your project"
      className="add-task-btn light-control-btn px-3 py-2 bg-green-700 outline-none hover:bg-green-900 rounded-md"
      onClick={() => saveFile(blob)}
    >
      Save
    </button>
  )
}