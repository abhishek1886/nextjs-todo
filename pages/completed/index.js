import { MongoClient } from "mongodb";
import React, { Fragment } from "react";
import Header from "@/components/Header";

const CompletedTodos = (props) => {
  const completedTodos = props.todoData.filter((todo) => todo.isCompleted);

  const completedTodosListElement = completedTodos.reverse().map((todo) => (
    <li
      className="flex mb-4 group items-center border-b-2 border-[#c2b2dc] pb-2"
      id={todo.id}
      key={todo.id}
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
  const client = await MongoClient.connect(
    "mongodb+srv://guptaabhishek1886:a1b7h7i0s1h3ek@cluster0.cd9v7gq.mongodb.net/todolist?retryWrites=true&w=majority"
  );
  const db = client.db();

  const todoCollection = db.collection("todolist");
  const result = await todoCollection.find().toArray();
  client.close();

  return {
    props: {
      todoData: result.reverse().map((todo) => ({
        title: todo.title,
        isCompleted: todo.isCompleted,
        id: todo._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default CompletedTodos;
