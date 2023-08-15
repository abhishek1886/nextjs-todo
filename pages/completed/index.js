import React, { Fragment } from "react";
import Header from "@/components/Header";

const CompletedTodos = (props) => {
  const completedTodos = props.todoData.filter((todo) => todo.isCompleted);

  const completedTodosListElement = completedTodos.reverse().map((todo) => (
    <li
      className="flex mb-4 group items-center border-b-2 border-[#c2b2dc] pb-2"
      id={todo.id}
    >
      <p className="w-full text-grey-darkest">{todo.title}</p>
    </li>
  ));
  return (
    <Fragment>
      <Header />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <h1 className="text-4xl border-b-2 border-[#766186] mb-10">
            Completed Todos
          </h1>
          <ul>{completedTodosListElement}</ul>
        </div>
      </div>
    </Fragment>
  );
};

export async function getStaticProps() {
  const response = await fetch("/api/todo-data");

  const res = await response.json();
  const data = res.data;
  return {
    props: {
      todoData: data,
    },
  };
}

export default CompletedTodos;
