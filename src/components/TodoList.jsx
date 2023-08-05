// TodoList.jsx

import TodoItem from "./TodoItem";
export default function TodoList({ todos, deletTodo }) {
  return (
    <>
      {todos.length > 0 ? (
        <ul className="list">
          {todos.map((obj) => (
            <TodoItem key={obj.id} todo={obj} deleteTodo={deletTodo} />
          ))}
        </ul>
      ) : (
        <h1> no todo item yet </h1>
      )}
    </>
  );
}

