import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const CreateTodo = ({todoItems, setTodoItems}) => {
  const [userTitle, setUserTitle] = useState('');
  const [userDesc, setUserDesc] = useState('');
  const [userDate, setUserDate] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    setTodoItems([...todoItems, {title: userTitle, desc: userDesc, date: userDate, isEditMode: false, completed: false, id: uuidv4() }]);

    setUserTitle('');
    setUserDesc('');
    setUserDate('');
    
  }
  const userTitleHandler = (e) => {
    setUserTitle(e.target.value);
  }
  const userDescHandler = (e) => {
    setUserDesc(e.target.value);
  }
  const userDateHandler = (e) => {
    setUserDate(e.target.value);
  }
  return (
    <div className='form-block'>
      <form className="form" action="#" onSubmit={addTodo}>
        <div className="form__box" >
          <label htmlFor="todo-title">Title</label>
          <input value={userTitle} onChange={userTitleHandler} name="todo-title" type="text" />
        </div>

        <div className="form__box">
          <label htmlFor="todo-desc">Description</label>
          <textarea value={userDesc} onChange={userDescHandler} name="todo-desc" rows="4"></textarea>
        </div>

        <div className="form__box">
          <label htmlFor="todo-desc">Due Date <span>(Optional)</span></label>
          <input value={userDate} onChange={userDateHandler} type="date" />
        </div>

        <div className="btn-holder">
          <button className="btn btn__add">Add Task</button>
        </div>
      </form>

    </div>
  );
}

export default CreateTodo;
