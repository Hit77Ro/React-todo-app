// TodoItem.jsx
export default function TodoItem({ todo: { id, content }, deleteTodo }) {
  return (
    <li data-id={id}>
      <label>
        <input type="checkbox" checked />
        {content}
      </label>
      <button className="btn btn-danger" onClick={deleteTodo}>
        delete
      </button>
    </li>
  );
}
