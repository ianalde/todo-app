import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';


function TodoList({todoItems, setTodoItems}) {
  const [filter, setFilter] = useState('All');  
  const [filteredItems, setFilteredItems] = useState([...todoItems])
  const filterHandler = e => setFilter(e.target.value);
  // const filter_map = {
  //   All: () => true,
  //   Active: state => !state.completed,
  //   Completed: state => state.completed,
  // };
  const note = {
    All: 'No tasks added.',
    Active: 'No Active Task.',
    Completed: 'No Completed Task.',
  }
  useEffect(() => {
    if(todoItems.length === 0 ) setFilter('All');
    setFilteredItems([...todoItems.filter(state => {
      let isValid = true;
        if(filter === 'All') isValid = true;
        if(filter === 'Active') isValid = !state.completed;
        if(filter === 'Completed') isValid = state.completed;
      return isValid;
    })]);
  }, [todoItems, filter])

  return (
    <div className='todo-list'>
      <div className='holder'>
        <h1>Tasks</h1>
        {todoItems[0] ? (<select onChange={filterHandler}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>) : '' }
      </div>
      {filteredItems.length === 0 ? (<p className="placeholder">{note[filter]}</p>) : ''}
      {filteredItems.map(todoItem =>
        <TodoItem
          todoItem={todoItem}
          todoItems={todoItems}
          setTodoItems={setTodoItems}
          key={todoItem.id}
        />)
      }
    </div>
  );
}

export default TodoList;
