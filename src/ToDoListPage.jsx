import React, { useState, useEffect } from 'react';
import api from './api/config';
import Panah from './assets/panah.svg';

const formatDeadline = (isoString) => {
  if (!isoString) return '';
  
  // Parse the ISO string components directly without creating a Date object
  const [datePart, timePart] = isoString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');
  
  // Get day name without timezone conversion
  const dateForDay = new Date(datePart + 'T00:00:00Z');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[dateForDay.getUTCDay()];
  
  // Format components
  const formattedDate = `${day}/${month}/${year.slice(-2)}`;
  const formattedTime = `${hours}.${minutes}`;
  
  return `${dayName}, ${formattedDate} ${formattedTime}`;
};

export default function ToDoListPage(){
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('Academic');
  const [activeFilter, setActiveFilter] = useState('Academic');
  const [todos, setTodos] = useState([]);

  // Fetch todos when component mounts or when filter changes
  useEffect(() => {
    fetchTodos();
  }, [activeFilter]);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos', {
        params: { category: activeFilter }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!input.trim() || !deadline.trim()) return;
    
    try {      
      const response = await api.post('/todos', { 
        title: input,
        deadline: deadline,
        category: category
      });
      
      // Sort todos by deadline when adding new todo
      const newTodos = [...todos, response.data].sort((a, b) => 
        new Date(a.deadline) - new Date(b.deadline)
      );
      
      setTodos(newTodos);
      setInput('');
      setDeadline('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Filter todos based on category
  const filteredTodos = todos.filter(todo => todo.category === activeFilter);

  const toggleTodoComplete = async (id) => {
    try {
      const response = await api.patch(`/todos/${id}/toggle`);
      const updatedTodo = response.data;
      
      // Remove the toggled todo from the current position
      const remainingTodos = todos.filter(todo => todo.id !== id);
      
      // Create new array with completed todos at the bottom
      const newTodos = [
        ...remainingTodos.filter(todo => !todo.completed),
        ...remainingTodos.filter(todo => todo.completed),
      ];
      
      // Insert the updated todo based on its completion status
      if (updatedTodo.completed) {
        newTodos.push(updatedTodo); // Add completed todo to the end
      } else {
        newTodos.unshift(updatedTodo); // Add uncompleted todo to the beginning
      }
      
      setTodos(newTodos);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-100 via-pink-50 to-sage-200">
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-8 text-sage-800 text-center">
          🍀 YOU CAN DO IT!! 🍀
        </h2>

        {/* Form Todo */}
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="w-full border border-sage-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white/50"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Date and Time Input */}
              <div className="relative flex-1">
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full border border-sage-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white/50 sm:appearance-auto appearance-none peer"
                  />
                  
                  {/* Mobile-only Placeholder overlay */}
                  {!deadline && (
                    <div className="sm:hidden absolute left-0 top-0 px-4 py-3 pointer-events-none text-sm text-gray-500 mt-1 flex items-center gap-2 bg-white/50 ">
                      <span>Set the deadline</span>
                    </div>
                  )}
                </div>
                {/* Desktop-only Selected deadline display */}
                {deadline && (
                  <div className="hidden sm:block absolute -top-6 left-0 text-sm text-sage-600 font-medium bg-white/90 px-2 py-1 rounded-t-lg shadow-sm">
                    Selected: {formatDeadline(deadline)}
                  </div>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none border border-sage-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white/50 pr-10"
                >
                  <option value="Academic">Academic</option>
                  <option value="Organization">Organization</option>
                </select>
                <img
                  src={Panah}
                  alt="Dropdown arrow"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-600 pointer-events-none"
                />
              </div>

              {/* Add Task Button */}
              <button
                onClick={addTodo}
                className="w-full sm:w-auto bg-gradient-to-r from-sage-400 to-sage-600 text-white font-bold px-6 py-3 rounded-lg hover:from-sage-600 hover:to-sage-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-2 justify-center px-2">
            <button
              onClick={() => setActiveFilter('Academic')}
              className={`flex-1 sm:flex-none px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === 'Academic'
                  ? 'bg-sage-500 text-white shadow-lg'
                  : 'bg-white/50 text-sage-700 hover:bg-sage-100'
              }`}
            >
              <span className="hidden sm:inline">Academic Tasks</span>
              <span className="sm:hidden">Academic</span>
            </button>
            <button
              onClick={() => setActiveFilter('Organization')}
              className={`flex-1 sm:flex-none px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === 'Organization'
                  ? 'bg-sage-500 text-white shadow-lg'
                  : 'bg-white/50 text-sage-700 hover:bg-sage-100'
              }`}
            >
              <span className="hidden sm:inline">Organization Tasks</span>
              <span className="sm:hidden">Organization</span>
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-4">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-sage-100"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodoComplete(todo.id)}
                      className="w-5 h-5 rounded-full border-sage-300 text-sage-600 focus:ring-sage-500 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className={`font-medium ${todo.completed ? 'line-through text-sage-800' : 'text-sage-800'}`}>
                        {todo.title}
                      </span>
                      <span className="text-sm text-sage-500">
                        🕒 {formatDeadline(todo.deadline)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-[#AB3007] hover:text-[#AB3007] font-medium bg-yellow-50 hover:bg-[#FFD87B] px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
