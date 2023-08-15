import { Fragment, useEffect, useState } from "react";

import Header from "@/components/Header";
import Todo from "@/components/Todo";

export default function Home(props) {
  const [todos, setTodos] = useState([]);

  let url = 'http://localhost:3000';
    const vc = process.env.VERCCEL_URL;
    if(vc){
      url = `http://${vc}`
    }

  const addTodoHandler = async (todoData) => {
    const data = { title: todoData, isCompleted: false };

    const response = await fetch(`${url}/api/add-todo`, {
      method: "POST",
      body: JSON.stringify({ title: todoData, isCompleted: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    setTodos((prev) => [{ ...data, id: resData._id }, ...prev]);
  };

  useEffect(() => {
    setTodos(props.todoData);
  }, []);

  const deleteTodoHandler = async (id) => {
    const updatedData = todos.filter(todo => todo.id !== id);
    setTodos(updatedData);

    const response = await fetch(`${url}/api/delete-todo`, {
      method: "DELETE",
      body: JSON.stringify({ id: id}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    console.log(data);
  };

  return (
    <Fragment>
      <Header />

      <main>
        <Todo
          onClick={addTodoHandler}
          todoData={todos}
          onDelete={deleteTodoHandler}
        />
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  let url = 'http://localhost:3000';
    const vc = process.env.VERCEL_URL;
    if(vc){
      url = `http://${vc}`
    }
  const response = await fetch(`${url}/api/todo-data`);

  const res = await response.json();
  const data = res.data;

  return {
    props: {
      todoData: data.reverse().map((todo) => ({
        title: todo.title,
        isCompleted: todo.isCompleted,
        id: todo._id,
      })),
    },
    revalidate: 1,
  };
}
