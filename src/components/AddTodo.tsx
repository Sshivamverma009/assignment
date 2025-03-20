"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Todo } from "@/models/todo.models";

interface AddTodoProps {
  onTodoAdded: (newTodo: Todo) => void;
}

const AddTodo = ({ onTodoAdded } : AddTodoProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/add-todo", {
        title,
        description,
        date: new Date(),
      });
      if(!response.data){
        setError("failed to add todo!");
      }
      console.log("todo added successfully!");
      setError("");
      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Add New Todo</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
