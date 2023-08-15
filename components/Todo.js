import TodoItem from "@/components/TodoItem";
import React, { Fragment, useRef, useState } from "react";

const Todo = (props) => {
  const inputRef = useRef();
  
  const todoListItem = props.todoData.map(todo => ( !todo.isCompleted &&
    <TodoItem
      key={todo.id}
      id={todo.id}
      isCompleted={todo.isCompleted}
      title={todo.title} 
      onDelete={props.onDelete}
     />
  ))

  return (
    <Fragment>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
                ref={inputRef}
              />
              <div className="flex items-center justify-center">
                <button
                  className="flex-no-shrink px-3 border-2 rounded bg-[#bc6cf9] hover:bg-[#9c41f4]"
                  onClick={() => props.onClick(inputRef.current.value)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
          <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            {props.todoData ? <ul>{todoListItem}</ul> : <p>Please add todo items.</p>}
          </div>
        </div>
    </Fragment>
  );
};

export default Todo;
