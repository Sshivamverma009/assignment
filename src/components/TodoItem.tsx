import React from "react";
import { Todo } from "@/models/todo.models";

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  onClick: () => void;
}

const TodoItem = ({ todo, isSelected, onClick }: TodoItemProps) => {
  return (
    <div
      className={`p-4 mb-2 flex flex-row justify-center align-middle rounded-lg border bg-white cursor-pointer shadow-gray-500`}
      onClick={onClick}
    >
      <div className="flex flex-col w-2xs items-start">
      <h3 className="font-semibold">{todo.title}</h3>
      <p className="text-gray-500 text-sm">{todo.description}</p>
      </div>
      <div className="text-gray-400 text-xs items-baseline">{typeof todo.date === "string" ? todo.date : new Date(todo.date).toLocaleDateString()}</div>
    </div>
  );
};

export default TodoItem;
