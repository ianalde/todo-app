import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';
import './css/app.scss';


function App() {
  const [todoItems, setTodoItems] = useState(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    return items ? items : [];
  });
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <div className='todo-section'>
      <h1>todo<span>&lt;app&gt;</span></h1>
      <CreateTodo todoItems={todoItems} setTodoItems={setTodoItems}/>
      <TodoList todoItems={todoItems} setTodoItems={setTodoItems}/>
    </div>
  );
}

export default App;
