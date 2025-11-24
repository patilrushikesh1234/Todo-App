import { useEffect, useMemo, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'

const STORAGE_KEY = 'todoapp.tasks'

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (_) {
      return []
    }
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const editingTodo = useMemo(
    () => todos.find((todo) => todo.id === editingId) ?? null,
    [todos, editingId],
  )

  const handleSaveTodo = ({ task, dueDate }) => {
    if (editingTodo) {
      setTodos((current) =>
        current.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, task, dueDate } : todo,
        ),
      )
      setEditingId(null)
      return
    }

    const newTodo = {
      id: Date.now(),
      task,
      dueDate,
      completed: false,
    }
    setTodos((current) => [...current, newTodo])
  }

  const handleToggleComplete = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleDelete = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
    if (editingId === id) {
      setEditingId(null)
    }
  }

  const handleEdit = (id) => setEditingId(id)
  const handleCancelEdit = () => setEditingId(null)

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  )

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Stay organized</p>
          <h1>Todo Planner</h1>
          <p className="subtitle">
            Add, edit, and track every task with due dates that stay saved in
            your browser.
          </p>
        </div>
        <div className="progress-pill">
          <span className="progress-value">
            {completedCount} / {todos.length}
          </span>
          <span className="progress-label">tasks completed</span>
        </div>
      </header>

      <main className="todo-card">
        <TodoForm
          onSave={handleSaveTodo}
          editingTodo={editingTodo}
          onCancelEdit={handleCancelEdit}
        />
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App
