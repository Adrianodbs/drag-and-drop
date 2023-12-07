import { CiCirclePlus } from 'react-icons/ci'
import { FormEvent, ChangeEvent } from 'react'

interface FormProps {
  onSubmit: (event: FormEvent) => void
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Form({ onSubmit, value, onChange }: FormProps) {
  return (
    <form className="w-full max-w-2xl mb-4 flex" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa..."
        className="flex-1 h-10 rounded-md px-2"
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="bg-slate-500 ml-4 rounded-md px-4 text-white font-bold"
      >
        <CiCirclePlus size={32} />
      </button>
    </form>
  )
}
