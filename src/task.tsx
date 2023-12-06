import { Draggable } from '@hello-pangea/dnd'

interface TaskProps {
  task: {
    id: string
    name: string
  }
  index: number
}

export function Task({ task, index }: TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div
          className="w-full bg-zinc-300 mb-2 last:mb-0 px-2 py-3 rounded border-[2px] border-zinc-400"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="font-medium">{task.name}</p>
        </div>
      )}
    </Draggable>
  )
}
