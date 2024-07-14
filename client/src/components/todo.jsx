import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../index.css";
import TodoCalendar from "../components/calendar";
import {
  FaCalendar,
  FaSearch,
  FaPlus,
  FaTrash,
  FaTasks,
  FaChartBar,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function Todo({ isDarkMode }) {
  const textColor = isDarkMode ? "text-rose-900" : "text-gray-800";
  const cardBg = isDarkMode
    ? "border-gray-100 border-2"
    : "bg-gray-100 border-black border-2";
  const inputBg = "bg-gray-200";
  const buttonBg = isDarkMode ? "bg-blue-600" : "bg-blue-500";
  const buttonHoverBg = isDarkMode ? "hover:bg-blue-700" : "hover:bg-blue-600";

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("addTask");

  const userId = useSelector((state) => state.auth.uid);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos/${userId}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const newTodo = {
      taskId: Date.now(),
      title: title.trim(),
      description: description.trim(),
      deadline: deadline,
      completed: false,
    };

    try {
      const response = await fetch(`${API_URL}/todos/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add todo");
      }
      if (data.success) {
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
        setDeadline("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (taskId) => {
    const todoToUpdate = todos.find((todo) => todo.taskId === taskId);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    try {
      const response = await fetch(`${API_URL}/todos/${userId}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      if (data.success) {
        setTodos(
          todos.map((todo) => (todo.taskId === taskId ? updatedTodo : todo))
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/todos/${userId}/${taskId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setTodos(todos.filter((todo) => todo.taskId !== taskId));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const title = todo.title || "";
    const description = todo.description || "";
    const lowercaseSearchTerm = searchTerm.toLowerCase();

    return (
      title.toLowerCase().includes(lowercaseSearchTerm) ||
      description.toLowerCase().includes(lowercaseSearchTerm)
    );
  });

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Todo-List</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-6">
          <div className="relative">
            <FaSearch className={`absolute left-3 top-3 ${textColor}`} />
            <input
              type="text"
              className={`w-full ${inputBg} ${textColor} p-2 pl-10 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`${cardBg} rounded-lg shadow-md p-6`}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaTasks className="mr-2" /> Tasks
            </h2>
            <ul className="space-y-4 max-h-96 overflow-y-auto">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.taskId}
                  className={`p-4 ${inputBg} rounded-lg shadow transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.taskId)}
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                      <span
                        className={`font-semibold ${textColor} ${
                          todo.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {todo.title}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.taskId)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <p
                    className={`mt-2 ${textColor} ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Deadline: {new Date(todo.deadline).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${cardBg} rounded-lg shadow-md p-6`}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaChartBar className="mr-2" /> Analytics
            </h2>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold">{totalTasks}</p>
                <p>Total Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">
                  {completedTasks}
                </p>
                <p>Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-500">
                  {pendingTasks}
                </p>
                <p>Pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <div className="flex">
            <button
              onClick={() => setActiveSection("addTask")}
              className={`flex-1 p-2 ${
                activeSection === "addTask" ? buttonBg : inputBg
              } ${
                activeSection === "addTask" ? "text-white" : textColor
              } rounded-l-lg transition-colors duration-300`}
            >
              <FaPlus className="inline mr-2" /> Add Task
            </button>
            <button
              onClick={() => setActiveSection("calendar")}
              className={`flex-1 p-2 ${
                activeSection === "calendar" ? buttonBg : inputBg
              } ${
                activeSection === "calendar" ? "text-white" : textColor
              } rounded-r-lg transition-colors duration-300`}
            >
              <FaCalendar className="inline mr-2" /> Calendar
            </button>
          </div>

          {activeSection === "addTask" && (
            <div className={`${cardBg} rounded-lg shadow-md p-6`}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaPlus className="mr-2" /> Add Task
              </h2>
              <form onSubmit={addTodo} className="space-y-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  maxLength={20}
                  className={`w-full p-2 ${inputBg} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description"
                  maxLength="50"
                  className={`w-full p-2 ${inputBg} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                ></textarea>
                <div>
                  <label className="block mb-2">Task Deadline:</label>
                  <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    min={today + "T00:00"}
                    className={`w-full p-2 ${inputBg} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full p-2 ${buttonBg} text-white rounded-lg ${buttonHoverBg} transition duration-300`}
                >
                  Add Task
                </button>
              </form>
            </div>
          )}

          {activeSection === "calendar" && (
            <div className={`${cardBg} rounded-lg shadow-md p-6`}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaCalendar className="mr-2" /> Calendar
              </h2>
              <TodoCalendar todos={todos} isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
