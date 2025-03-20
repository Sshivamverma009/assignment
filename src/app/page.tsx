'use client'
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import TodoModel, { Todo } from "@/models/todo.models";
import Sidebar from "@/components/sideBar";
import TodoEditor from "@/components/TodoEditor";
import AddTodo from "@/components/AddTodo";

export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('/api/get-todos');
        console.log("Response from frontend ::", response);
        const todoArray = response.data?.todos;
        setTodos(todoArray);
        console.log("todos fetched successfully in frontend!");
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log("Error :: ", axiosError);
      }
    }
    getTodos();
  }, [setTodos])

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;
    try {
      const res = await axios.delete(`/api/delete-todo`, { data: { title: selectedTodo?.title } });
      if (!res) {
        console.log("todo not deleted!");
        return;
      }
      setTodos(todos.filter((todo) => todo.title !== selectedTodo.title))
      setSelectedTodo(null);
      console.log("todo deleted successfully!");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error ::", axiosError);
    }
  }

  const handleTodoAdded = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-200">
      {/* Sidebar */}
      <Sidebar todos={todos} selectedTodo={selectedTodo} onSelectTodo={handleSelectTodo} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Add Todo Section */}
        <div className="p-4 bg-white shadow-md">
          <AddTodo onTodoAdded={handleTodoAdded} />
        </div>

        {/* Todo Editor */}
        <TodoEditor todo={selectedTodo} onDelete={handleDeleteTodo} />
      </div>
    </div>
  );
}
