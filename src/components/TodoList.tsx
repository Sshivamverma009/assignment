import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../models/todo.models";

interface TodoListProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
}

const TodoList = ({ todos, selectedTodo, onSelectTodo } : TodoListProps) => {
  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id} 
          todo={todo} 
          isSelected={selectedTodo?.id === todo.id}  
          onClick={() => onSelectTodo(todo)} 
        />
      ))}
    </div>
  );
};

export default TodoList;
