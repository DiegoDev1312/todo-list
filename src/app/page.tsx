"use client"

import { useEffect, useReducer, useState } from "react";
import { taskReducer } from "@/reducers/taskReducer";
import { TaskProps } from "@/types/Task";
import { v4 as uuidv4 } from 'uuid';

function Page() {
  const storageList = localStorage.getItem('@task_list');
  const [taskName, setTaskName] = useState('');
  const [taskList, dispatch] = useReducer(taskReducer, storageList ? JSON.parse(storageList) : []);
  const [editId, setEditId] = useState<string>('');
  const [editText, setEditText] = useState('');
  
  useEffect(() => {
    updateStorageList(taskList.length > 0 ? taskList : []);
  }, [taskList]);

  function updateStorageList(list: TaskProps[]) {
    localStorage.setItem('@task_list', JSON.stringify(list));
  }

  function handleAddPress() {
    dispatch({
      type: 'add',
      payload: {
        taskName,
        id: uuidv4(),
      },
    });
    setTaskName('');
  }

  function handleTogglePress(idList: string) {
    dispatch({
      type: 'toggleDone',
      payload: {
        id: idList,
      },
    });
  }

  function handleDeletePress(idList: string) {
    dispatch({
      type: 'remove',
      payload: {
        id: idList,
      },
    });
  }

  function handleEditPress(idList: string, oldText: string) {
    setEditId(idList);
    setEditText(oldText);
  }

  function handleConfirmEditPress() {
    if (editText) {
      dispatch({
        type: 'editText',
        payload: {
          id: editId,
          text: editText,
        }
      });
      closeEditArea();
    }
  }

  function closeEditArea() {
    setEditId('');
    setEditText('');
  }

  function renderList() {
    return taskList.map((task) => {
      const coditionThrough = task.isChecked ? 'line-through' : '';

      if (editId === task.id) {
        return (
          <label className="flex items-center p-2 gap-2" key={task.id}>
            <input value={editText} onChange={(event) => setEditText(event.target.value)} className="h-8 pl-2" />
            <div className="flex items-center gap-2">
              <button className="hover:text-blue-400 text-gray-800" onClick={handleConfirmEditPress}>Confirmar</button>
              <button className="hover:text-red-500 text-gray-800" onClick={closeEditArea}>Cancelar</button>
            </div>
          </label>
        );
      }

      return (
        <label className="flex items-center justify-between p-2 gap-2 relative" key={task.id}>
          <div className="flex items-center gap-2 break-words break-all cursor-pointer w-11/12">
            <input type='checkbox' checked={task.isChecked} className="h-4 w-4" onChange={() => handleTogglePress(task.id)} />
            <p className={`${coditionThrough} `}>{task.name}</p>
          </div>
          <div className="flex gap-1">
            <button onClick={() => handleDeletePress(task.id)}  className="h-8 w-8">
              <img src="./bin-icon.svg"  className="h-5 w-5 object-cover" />
            </button>
            <button onClick={() => handleEditPress(task.id, task.name)} className="h-8 w-8">
              <img src="./edit-icon.svg"  className="h-5 w-5 object-cover" />
            </button>
          </div>
        </label>
      );
    });
  }

  return (
    <main className="bg-gradient-to-r from-green-500 to-green-800 min-h-screen flex justify-center select-none">
      <div className="mt-5 w-full px-3 mb-3 md:px-0 md:w-3/5">
        <div className="bg-white w-full flex items-center bg-blue-400/50">
          <input
            placeholder="Adicione um item"
            className="w-full outline-none p-3"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button onClick={handleAddPress} className="text-white bg-green-500 p-3">ADD</button>
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
