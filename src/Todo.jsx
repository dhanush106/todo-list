import { useState } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Check } from 'lucide-react';

const Todo = () => {
  const [listItems, setListItems] = useState([{ name: 'task-1', key: uuidv4(), completed: false }]);
  const [searchValue, setSearchValue] = useState('');

  function handleChange(e) {
    if (searchValue === '') {
      return;
    }
    e.preventDefault();
    const newItem = {
      name: searchValue,
      key: uuidv4(),
      completed: false,
    };
    setListItems([...listItems, newItem]);
    setSearchValue('');
  }

  function deleteItem(id) {
    const updateItems = listItems.filter(item => item.key !== id);
    setListItems(updateItems);
  }

  function statusUpdated(id) {
    const updatedItems = listItems.map((item) => {
      if (item.key === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setListItems(updatedItems);
  }

  return (
    <div className='min-h-screen flex justify-center items-center flex-col bg-gray-800'>
      <div className='mx-auto space-x-2'>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleChange(e);
            }
          }}
          className='p-4 outline-0 text-white rounded-md font-bold bg-gray-900'
        />
        <button
          disabled={!searchValue.trim()}
          onClick={(e) => handleChange(e)}
          className={`px-6 py-4 rounded-md text-white transition-colors 
            ${!searchValue.trim() 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-black hover:bg-white hover:text-gray-800 cursor-pointer'}`}
        >
          Add
        </button>
      </div>

      <div className='mx-auto bg-gray-900 mt-4 w-full max-w-lg rounded-md shadow-md'>
        <ol className='text-white p-3 my-2 space-y-3'>
          {listItems.map((item) => (
            <li
              key={item.key}
              className={`flex justify-between items-center hover:bg-black gap-10 px-4 py-2 rounded-md transition-all ${item.completed ? 'line-through text-gray-400' : 'text-white font-bold'}`}
            >
              <div className='p-2'>
                {item.name}
              </div>
              <div className='flex gap-7'>
                <div
                  className='hover:bg-red-600 hover:drop-shadow-red-600 hover:font-bold cursor-pointer p-2 rounded-md hover:text-black'
                  onClick={() => deleteItem(item.key)}
                >
                  <Trash2 size={20} />
                </div>
                <div
                  className='hover:bg-white cursor-pointer p-2 rounded-md hover:text-black'
                  onClick={() => statusUpdated(item.key)}
                >
                  <Check size={20} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Todo;
