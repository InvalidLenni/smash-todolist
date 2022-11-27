import React from 'react'
import { initList } from '../initList'
import { v4 as uuidv4 } from 'uuid';


export default function EventHandler() {

    const [list, setList] = React.useState(initList);
    const [title, setTitle] = React.useState('');
    const [finished, setFinished] = React.useState(Boolean);


    function handleChange(event) {
        // Handle Event Changes

        setTitle(event.target.value);
    }


    function handleAdd() {
        // Handle Add Item
        
        const newList = list.concat({ id: uuidv4(), title: title, finished: false });
        

        setList(newList);
        
        setTitle('');
    }

    function handleFinish() {
        // Handle Finish Item
    }

    return (
        <div>
            <AddItem
                title={title}
                onChange={handleChange}
                onAdd={handleAdd}
            />
            <List list={list} />
        </div>
    );
};


export const AddItem = ({ title, onChange, onAdd }) => (
  <div>
    <input className="input w-full max-w-xs" type="text" value={title} onChange={onChange} />
    <button type="button" onClick={onAdd}>
      Add
    </button>
  </div>
);

export const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id}>{item.title}</li>
    ))}
  </ul>
);