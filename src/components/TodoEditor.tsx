import React from "react";
import { Todo } from "../models/todo.models";

interface TodoEditorProps {
  todo: Todo | null;
  onDelete: (id: number) => void;
}

const TodoEditor = ({ todo, onDelete } : TodoEditorProps) => {
  if (!todo) return <div className="flex-1 p-6">Select a todo to view</div>;

  return (
    <div className="flex-1 p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{todo.title}</h1>
        <button className="text-red-500" onClick={() => onDelete(todo.id)}>🗑️</button>
      </div>
      <hr className="my-2" />
      <p className="text-gray-600">{todo.description}</p>
    </div>
  );
};

export default TodoEditor;
