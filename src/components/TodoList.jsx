import TodoItem from './TodoItem.jsx'

function TodoList({ todos, onToggleComplete, onEdit, onDelete }) {
  if (!todos.length) {
    return <p className="todo-empty">No tasks yet — add your first one above.</p>
  }

  const sortedTodos = [...todos].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate),
  )

  return (
    <ul className="todo-list">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList

