import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import './style.css';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    const addTodo = () => {
        if (newTodo.trim() === '') return;
        const newTodoItem: Todo = {
            id: todos.length + 1,
            text: newTodo,
            completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <div className="todo-list">
            <h3>To-Do List &nbsp;
                <Icon icon="lucide:list-todo" /></h3>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => removeTodo(todo.id)}>
                            <Icon icon="fluent-emoji-high-contrast:cross-mark" /></button>
                    </li>
                ))}
            </ul>
            <div className="todo-input">
                <input
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter Todo..."
                />
            </div>
        </div>
    );
};

export default TodoList;
