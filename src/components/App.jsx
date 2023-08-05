// App.jsx
import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function App() {
  const [duplicateId, setDuplicateId] = useState(null);
  const [todos, setTodos] = useState(() => {
    const local = localStorage.getItem("todos");
    if (!local) return [];
    return JSON.parse(local);
  });

  const submitForm = (userInput) => {
    if (userInput !== "") {
      const duplicate = todos.find((el) => el.content === userInput);
      if (!duplicate) {
        setTodos((todos) => [
          { id: crypto.randomUUID(), content: userInput },
          ...todos,
        ]);
        setDuplicateId(null);
        return;
      }
      setDuplicateId(duplicate.id);
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (duplicateId) {
      document
        .querySelector(`[data-id="${duplicateId}"]`)
        .classList.add("existe");
      return;
    }
  }, [duplicateId]);

  const deleteTodo = (e) => {
    const todo = e.currentTarget.closest("li");
    setTodos(todos.filter((obj) => obj.id !== todo.dataset.id));
    setDuplicateId(null);
  };
  return (
    <>
      <TodoForm onSubmit={submitForm} />
      <h1 className="header"> todo list</h1>

      <TodoList
        deletTodo={deleteTodo}
        todos={todos}
      />
    </>
  );
}
