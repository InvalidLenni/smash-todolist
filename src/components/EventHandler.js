import React from 'react'
import { initList } from '../initList'
import { v4 as uuidv4 } from 'uuid';



export default function EventHandler() {

    const [list, setList] = React.useState(initList);
    const [title, setTitle] = React.useState('');
    const [completed, setCompleted] = React.useState(false);
    const [lsObject, setlsObject] = React.useState(localStorage.getItem("tasks"))
    const [parsedList, setparsedList] = React.useState(JSON.parse(lsObject))
  
  function addToLocalStorage(title) {
      const newItem = [
        ...parsedList,
        {
          id: uuidv4(),
          title: title,
          completed: false,
        }
      ]
      localStorage.setItem("tasks", JSON.stringify(newItem))
  }




  function handleChange(event) {
    // Handle Event Changes

    if (event.target.value) {
      setTitle(event.target.value);
      setCompleted(event.target.checked);
    } else {
      console.log("Event Target is Null.")
    }

  }

  function updateLocalStorage(item, itemID) { 

    const modifiedItem = [
      ...parsedList,
      {
        ...item,
        completed: true
      }
    ]


    console.info("updated")
    localStorage.setItem("tasks", JSON.stringify(modifiedItem))
  }

  function handleAddTask() {
    // Handle Add Item
        
    if (title === null) {
      console.error("No given title.")
    }
    const newList = list.concat({ id: uuidv4(), title: title, completed: completed });
      
    setList(newList);
        
    setTitle('');
    
    addToLocalStorage(title)        
   
    console.log("Task added.");
    }

    function handleCompleteTask(item) {
      // Handle Complete Task

      const modifiedList = list.push({ ...item, completed: item.completed });
      
      updateLocalStorage(item)

      setList(modifiedList);

      setCompleted(item.completed);

      console.log("Task completed.");
    }

    function handleToggleCompleted(itemID) {

      // Handle Toggle Checkbox Completedt

      setList(parsedList.map(item => {
        if (item.id === itemID) {
          updateLocalStorage(item)
          console.info("Item was marked as final completed.");
          return { ...item, completed: true };    
        } else {
          console.info("Item was already marked as final completed.");
          return item;
        }
      }));

      console.log("It's successfully handled toggle completed.");
    }
    
    return (
          <div>
              <AddItem
                  title={title}
                  onChange={handleChange}
                  onAdd={handleAddTask}
        />
                <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
                  <List list={parsedList} onToggleCompleted={handleToggleCompleted} onCompleteTask={handleCompleteTask}  />
                </div>
                <div className="divider divider-horizontal">- | -</div>
                <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
                  <UCList list={parsedList} />
                </div>
          </div>
      );
  };

export const AddItem = ({ title, onChange, onAdd }) => (
  <div>
    <input className="input w-full max-w-xs" type="text" value={title} onChange={onChange} required />
    <button type="button" onClick={onAdd}>
      +
    </button>
  </div>
);


export const UCList = ({ list }) => (
  <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
    <ul>
    {list
            .filter((item) => item.completed === true)
            .map(((item) => {
              return (
                <li
                  key={item.id}
                >
                  <label>
                    {item.title}
                  </label>
                    <input type="checkbox" className="checkbox checkbox-xs" checked={item.completed} name="radio-2" disabled />
                </li>
              );
            }))}
      </ul>
  </div>
)
export const List = ({ list, onToggleCompleted, handleCompleteTask }) => (
  <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
  <ul>
      {list
        .filter((item) => item.completed === false)
        .map((item) => (
      <li key={item.id}>
        <label>
              {item.title}     
          <input type="checkbox" checked={item.completed}
            onClick={handleCompleteTask}
            onChange={e => {
                onToggleCompleted(
                  item.id,
                  e.target.checked
                );
                }}
                 className="checkbox checkbox-xs" />
        </label>
        </li>
    ))}
    </ul>
    </div> 
);