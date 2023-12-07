import { useState, FormEvent, useEffect } from 'react'
import { Task } from './components/task'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import Form from './components/Form'

interface TaskItemProps {
  id: string
  name: string
}

function App() {
  const [newTask, setNewTask] = useState('')
  const storedTasks = localStorage.getItem('@tasks-dragdrop')
  const [tasks, setTasks] = useState<TaskItemProps[]>(
    storedTasks ? JSON.parse(storedTasks) : []
  )

  useEffect(() => {
    storedTasks
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('@tasks-dragdrop', JSON.stringify(tasks))
  }, [tasks])

  function handleAddTask(event: FormEvent) {
    event.preventDefault()

    if (newTask === '') return

    let newItem = {
      id: `${tasks.length + 1}`,
      name: newTask
    }

    setTasks((allTasks: TaskItemProps[]) => [...allTasks, newItem])
    setNewTask('')
  }
  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    const items = reorder(tasks, result.source.index, result.destination.index)

    setTasks(items)
  }

  return (
    <div className="w-full h-screen flex flex-col items-center px-4 pt-52 bg-slate-700">
      <h1 className="font-bold text-4xl text-white mb-4">Tarefas</h1>

      <Form
        onSubmit={handleAddTask}
        value={newTask}
        onChange={event => setNewTask(event.target.value)}
      />

      <section className="bg-slate-200 p-3 rounded-md w-full max-w-2xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {provided => (
              <article ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}

                {provided.placeholder}
              </article>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  )
}

export default App
