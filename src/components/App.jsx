import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [duplicateId, setDuplicateId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput !== "") {
      const duplicate = todos.find((el) => el.content === userInput);
      if (!duplicate) {
        setTodos((todos) => [
          { id: crypto.randomUUID(), content: userInput },
          ...todos,
        ]);
        setUserInput("");
        setDuplicateId(null);
      } else {
        // when find a duplicate element ,it set bg-color to red ,, but when keep typing it reset the inline style , because react re-render the components
        // document.querySelector(
        //   `[data-id="${duplicate.id}"]`
        // ).style.backgroundColor = "red";
        setDuplicateId(duplicate.id); // this is note also a solution
      }

      // print pevious stat value not the new value
      // to catch the new value => use  useEffect with dependency of  todos
      // console.log(todos);
      // this does not work
      // localStorage.setItem("todos", JSON.stringify(todos));
    }
  };
  const Todo = ({ todo: { id, content } }) => (
    <li data-id={id}>
      <label>
        <input type="checkbox" name="" id="" />
        {content}
      </label>
      <button
        className="btn btn-danger"
        onClick={(e) => {
          const todo = e.currentTarget.closest("li");
          //removing the todo item from todos ,
          setTodos(todos.filter((obj) => obj.id !== todo.dataset.id));
          // freeing memory
          setDuplicateId(null);
          // that does not work !! because todos it not updated
          // localStorage.setItem("todos", JSON.stringify(todos));
        }}
      >
        delete
      </button>
    </li>
  );
  // retreiving the todos array from locaolStorage if it existe
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);
  // catching the updated todos , and pushing it to localstorage
  useEffect(() => {
    // since todos is  [] at first then it take the localstorage value
    // if  odos #= initialvalue

    // run code only after it takes localstorage value
    //* problem when there is one item  ,then wen try to remve it  ,it does not ;because useEffect check for todos.lenght (== 0 );
    // if (todos.length  >0) {
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log("changed");
    // }

    /*  console.log(todos) ;
     * what happen:   suppose localstorage is not empty
     * useEffect 1
     * todos is set  , but it's value is still the inistal value ([]) ,
     * then useEffect 2  : since todos is empty => skipp condition  => print empty array
     * then React re-render the component,update todos to localstorage value
     *
     * useEffect 2 => run the condition
     * log(array value )
     *
     */
  }, [todos]);

  useEffect(() => {
    if (duplicateId) {
      document.querySelector(
        `[data-id="${duplicateId}"]`
      ).classList.add("existe")
    }
  }, [duplicateId]);
  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">new item</label>

          <input
            type="text"
            name=""
            // this is not neccessary but ,just to empty input after adding.
            value={userInput}
            id="item"
            onChange={(e) =>
              e.key === "Enter" ? document.querySelector(".add").click() : null
            }
            onInput={(e) => setUserInput(e.target.value.trim())}
          />
        </div>
        <button className="btn add">add</button>
      </form>

      <h1 className="header"> todo list</h1>

      {todos.length > 0 ? (
        <ul className="list">
          {todos.map((obj) => (
            <Todo key={obj.id} todo={obj} />
          ))}
        </ul>
      ) : (
        <h1> No todos yet</h1>
      )}
    </>
  );
}
