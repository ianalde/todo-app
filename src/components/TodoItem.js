import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrashCan,
  faPenToSquare
} from '@fortawesome/free-regular-svg-icons';
import { 
  faCheck,
  faBan
} from '@fortawesome/free-solid-svg-icons';
import {CSSTransition} from 'react-transition-group';


function TodoItem({todoItem, todoItems, setTodoItems}) {
  const [item, setItem] = useState(todoItem);
  const [isEnter, setIsEnter] = useState(true);
  const nodeRef = useRef(null);

  const deleteItemHandler = () => {
    setIsEnter(false);
    setTimeout(() => {
      setTodoItems(todoItems.filter(state => state.id !== todoItem.id));
  }, 200);
    
  }
  const editModeHelper = result => {
    setTodoItems(todoItems.map(state => {
      if(state.id === todoItem.id) {
        return {...state, isEditMode: result}
      }
      return state;
    }));
  }
  const editItemHandler = () => {
    setItem(todoItem);
    editModeHelper(true);
  };
  const editSubmitHandler = e => {
    e.preventDefault();
    setTodoItems(todoItems.map(state => {
      if(state.id === todoItem.id) {
        return {...state, isEditMode: false, title: item.title, desc: item.desc, date: item.date}
      }
      return state;
    }));
  }
  const cancelHandler = () => editModeHelper(false);
  const editTitle = e => setItem({...item, title: e.target.value});
  const editDesc = e => setItem({...item, desc: e.target.value});
  const editDate = e => setItem({...item, date: e.target.value});

  const taskDoneHandler = (e) => {
    setTodoItems(todoItems.map(state => {
      if(state.id === todoItem.id) {
        return {...state, completed: e.target.checked}
      }
      return state;
    }));
  }
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isEnter}
      timeout={200}
      appear={true}
      classNames="animate"
    >
    <div ref={nodeRef} className={`todo-item${todoItem.isEditMode ? ' edit-mode' : ''}${todoItem.completed ? ' complete' : ''}`}>
      <div className="todo-default">
        <div className="item-view">
          <h2 className='todo-title'>{todoItem.title}</h2>
          <p className='todo-description'>{todoItem.desc}</p>
          <p className='todo-date'>{todoItem.date ? todoItem.date : 'No Deadline'}</p>
        </div>
        <div className="controls">
          <label className="btn__done">
            <input onChange={taskDoneHandler} type="checkbox" checked={todoItem.completed}/>
            <span className="checkmark"></span>
          </label>
          <button className="btn__edit" type="button" onClick={editItemHandler}><FontAwesomeIcon icon={faPenToSquare} fixedWidth/></button>
          <button className="btn__delete" type="button" onClick={deleteItemHandler}><FontAwesomeIcon icon={faTrashCan} fixedWidth/></button>
        </div>
      </div>
      <div className="todo-edit">
        <form action="#" onSubmit={editSubmitHandler}>
          <div className="item-view">
            <div className="form__box" >
              <input onChange={editTitle} value={item.title} type="text" placeholder="Title"/>
            </div>
            <div className="form__box" >
              <textarea rows="4" onChange={editDesc} value={item.desc}  type="text" placeholder="Description"/>
            </div>
            <div className="form__box">
              <input onChange={editDate} value={item.date} type="date" />
            </div>
          </div>
          <div className="controls">
            <button className="btn__ok" type="submit"><FontAwesomeIcon icon={faCheck} fixedWidth/></button>
            <button className="btn__cancel"type="button" onClick={cancelHandler}><FontAwesomeIcon icon={faBan} fixedWidth/></button>
          </div>
        </form>
      </div>
    </div>
    </CSSTransition>
  );
}

export default TodoItem;
