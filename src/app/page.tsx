"use client"

import { TaskProps } from "@/types/Task";
import { useEffect, useState } from "react";

function Page() {
  const [taskList, setTaskList] = useState<TaskProps[]>([]);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const storageList = localStorage.getItem('@task_list');
  
    if (storageList) {
      setTaskList(JSON.parse(storageList));
    } else {
      setTaskList([]);
    }
  }, []);

  function updateStorageList(list: TaskProps[]) {
    localStorage.setItem('@task_list', JSON.stringify(list));
  }

  function handleAddPress() {
    const taskListBody: TaskProps = {
      id: taskList.length + 1,
      name: taskName,
      isChecked: false,
    };
    const newList = [...taskList, taskListBody];

    setTaskList(newList);
    setTaskName('');
    updateStorageList(newList);
  }

  function handleTogglePress(idList: number) {
    const newList = taskList.map((list) => {
      if (list.id === idList) {
        return {
          ...list,
          isChecked: !list.isChecked,
        }
      }
      return list;
    });

    setTaskList(newList);
    updateStorageList(newList);
  }

  function handleDeletePress(idList: number) {
    const newList = taskList.filter((task) => task.id !== idList);
    setTaskList(newList);
    updateStorageList(newList);
  }

  function renderList() {
    return taskList.map((task) => {
      const coditionThrough = task.isChecked ? 'line-through' : '';

      return (
        <label className="flex items-center justify-between p-2 gap-2 relative" key={task.id}>
          <div className="flex items-center gap-2 break-words break-all cursor-pointer w-11/12">
            <input type='checkbox' checked={task.isChecked} className="h-4 w-4" onClick={() => handleTogglePress(task.id)} />
            <p className={`${coditionThrough} `}>{task.name}</p>
          </div>
          <button onClick={() => handleDeletePress(task.id)}  className="h-8 w-8">
            <img src="./bin-icon.svg"  className="h-5 w-5 object-cover" />
          </button>
        </label>
      );
    });
  }

  return (
    <main className="bg-gradient-to-r from-blue-500 to-blue-700 min-h-screen flex justify-center">
      <div className="mt-5 w-full px-3 mb-3 md:px-0 md:w-3/5">
        <div className="bg-white w-full flex items-center bg-blue-400/50">
          <input
            placeholder="O que você fará?"
            className="w-full outline-none p-3"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button onClick={handleAddPress} className="text-white bg-blue-300 p-3">ADD</button>
        </div>
        <div className="p-3 bg-white/80 flex items-center justify-center my-3">
          <p>{taskList.length} item(s) na lista</p>
        </div>
      {taskList.length > 0 && (
        <div className="bg-white/80">
          <ul>
            {renderList()}
          </ul>
        </div>
      )}
      </div>
    </main>
  )
}

export default Page;
