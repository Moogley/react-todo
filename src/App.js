import React, { useState, useRef, useEffect } from 'react';
import Todos from './components/Todos';
import uuidv4 from 'uuid/v4'
import './App.css';

// uuidv4 was installed through npm and is used to generate unique id's for each todo item

// this const is set up to store the todos and state to local storage so the todos remain with the correct state
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])

    // Allows us to use todoNameRef as the ref='' for the <input> tag as a way of targeting the input field
    const todoNameRef = useRef()

    // takes stored todos from local storage and loads them to the list with their state
    useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if (storedTodos)
      // this makes sure there is a check for stored todos first, if they exist, they will be set with setTodos
      setTodos(storedTodos)
    }, [])

    // saves current items and state on the list to the local storage
    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])


    // takes the id of the todo we click, sets a new array from the list of todos so we don't mutate the todo list
    // sets todo to the specific todo referenced by id, then reverses the complete state of the todo, setTodos to change the list
    function toggleTodo(id) {
      const newTodos = [...todos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.complete = !todo.complete
      setTodos(newTodos)
    }

    // uses the useRef() hook to reference the text currently typed into the input field with todoNameRef and sets the value to name
    // if it's blank, we return to break the function, else we setTodos. prevTodos is the current list
    // prevTodos gets returned with the new todo as the next value on the end. id is set randomly with uuidv4
    function handleAddTodo(e) {
      const name = todoNameRef.current.value
      if (name === '') return
      setTodos(prevTodos => {
        return[...prevTodos, { id: uuidv4(), name: name, complete: false }]
      })
      todoNameRef.current.value = null
    }

    // pretty self-explanatory
    function handleClearTodos() {
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    }

  return (
    <div className="App">
    
      <Todos todos={todos} toggleTodo={toggleTodo} /> 
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div> {todos.filter(todo => !todo.complete).length} left to go</div>
    </div>
  );
}

export default App;