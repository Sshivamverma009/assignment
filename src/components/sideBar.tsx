import React from "react";
import TodoList from "./TodoList";
import { Todo } from "@/models/todo.models";

interface SidebarProps {
    todos: Todo[];
    selectedTodo: Todo | null;
    onSelectTodo: (todo: Todo) => void;
}

const Sidebar = ({ todos, selectedTodo, onSelectTodo }: SidebarProps) => {
    return (
        <div className="w-1/3 bg-gray-100 p-4 h-screen">
            <h2 className="text-lg font-bold mb-4">TODO</h2>
            <TodoList todos={todos} selectedTodo={selectedTodo} onSelectTodo={onSelectTodo} />
        </div>
    );
};

export default Sidebar;
