import React, { useState, useEffect } from 'react';
import api from './api/config';
import Panah from './assets/panah.svg';

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
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ));
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
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="w-full border border-sage-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white/50"
            />
            <div className="flex gap-2">
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="flex-1 border border-sage-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white/50"
              />
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none border border-sage-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white/50 pr-10 w-full"
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
              <button
                onClick={addTodo}
                className="bg-gradient-to-r from-sage-400 to-sage-600 text-white font-bold px-6 py-3 rounded-lg hover:from-sage-600 hover:to-sage-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setActiveFilter('Academic')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === 'Academic'
                  ? 'bg-sage-500 text-white'
                  : 'bg-white/50 text-sage-700 hover:bg-sage-100'
              }`}
            >
              Academic
            </button>
            <button
              onClick={() => setActiveFilter('Organization')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === 'Organization'
                  ? 'bg-sage-500 text-white'
                  : 'bg-white/50 text-sage-700 hover:bg-sage-100'
              }`}
            >
              Organization
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
                        🕒 {new Date(todo.deadline).toLocaleString()}
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
