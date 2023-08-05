// TodoForm.jsx
import { useState } from "react";

export default function TodoForm({ submitForm }) {
  const [userInput, setUserInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(userInput);
    setUserInput("");
  };
  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>new item</label>

        <input
          type="text"
          value={userInput}
          onChange={(e) =>
            e.key === "Enter" ? document.querySelector(".add").click() : null
          }
          onInput={(e) => setUserInput(e.target.value.trim())}
        />
      </div>
      <button className="btn add">add</button>
    </form>
  );
}
