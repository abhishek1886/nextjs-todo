import React, { useEffect, useState } from "react";

const TodoItem = (props) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(props.isCompleted);
  }, []);

  const updateTodoHandler = async () => {
    setDone(true);

    let url = 'http://localhost:3000';
    const vc = process.env.VERCCEL_URL;
    if(vc){
      url = `http://${vc}`
    }

    const response = await fetch(`${url}/api/update-todo`, {
      method: "POST",
      body: JSON.stringify({
        title: props.title,
        _id: props.id,
        isCompleted: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  const deleteTodoHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li
      className="flex mb-4 group items-center border-b-2 border-[#766186] pb-2"
      id={props.id}
    >
      {done ? (
        <p className="w-full line-through text-green-500">{props.title}</p>
      ) : (
        <p className="w-full text-grey-darkest">{props.title}</p>
      )}

      <button

        className="hidden group-hover:block flex-no-shrink px-2 py-1 ml-4 mr-2 border-2 rounded hover:text-white text-green disabled:bg-gray-500 border-green hover:bg-green"
        onClick={updateTodoHandler}
        disabled={done}
      >
        Done
      </button>
      <button

        className="hidden group-hover:block flex-no-shrink px-2 py-1 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
        onClick={deleteTodoHandler}
      >
        Remove
      </button>
    </li>
  );
};

export default TodoItem;
