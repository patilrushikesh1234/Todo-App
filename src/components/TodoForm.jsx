import { useEffect, useMemo, useState } from 'react'

const MIN_DATE = () => new Date().toISOString().split('T')[0]

function TodoForm({ onSave, editingTodo, onCancelEdit }) {
  const [task, setTask] = useState(editingTodo?.task ?? '')
  const [dueDate, setDueDate] = useState(editingTodo?.dueDate ?? '')
  const [error, setError] = useState('')

  const isEditing = useMemo(() => Boolean(editingTodo), [editingTodo])

  useEffect(() => {
    setTask(editingTodo?.task ?? '')
    setDueDate(editingTodo?.dueDate ?? '')
    setError('')
  }, [editingTodo])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTask = task.trim()

    if (!trimmedTask) {
      setError('Please enter a task name.')
      return
    }

    if (!dueDate) {
      setError('Please pick a due date.')
      return
    }

    onSave({ task: trimmedTask, dueDate })
    setTask('')
    setDueDate('')
    setError('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="task">Task name</label>
        <input
          id="task"
          type="text"
          placeholder="e.g. Submit project brief"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="dueDate">Due date</label>
        <input
          id="dueDate"
          type="date"
          min={MIN_DATE()}
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        {isEditing && (
          <button type="button" className="btn ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn primary">
          {isEditing ? 'Update task' : 'Add task'}
        </button>
      </div>
    </form>
  )
}

export default TodoForm

