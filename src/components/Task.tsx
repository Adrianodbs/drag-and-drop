import { Draggable } from '@hello-pangea/dnd'
import { FaTrashCan } from 'react-icons/fa6'

interface TaskProps {
  task: {
    id: string
    name: string
  }
  index: number
  onClick: () => void
}

export function Task({ task, index, onClick }: TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div
          className="w-full flex justify-between bg-slate-600 text-white uppercase mb-2 last:mb-0 px-2 py-3 rounded border-[2px] border-zinc-400"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="font-medium">{task.name}</p>
          <FaTrashCan className="text-red-600" size={18} onClick={onClick} />
        </div>
      )}
    </Draggable>
  )
}
