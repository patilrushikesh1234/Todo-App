function formatDate(dateString) {
  if (!dateString) return 'No due date'

  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
        />
        <span className="task-name">{todo.task}</span>
      </label>
      <div className="todo-meta">
        <span className="due-date">Due {formatDate(todo.dueDate)}</span>
        <div className="todo-actions">
          <button
            type="button"
            className="btn ghost"
            onClick={() => onEdit(todo.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn danger"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoItem

