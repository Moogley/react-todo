import React from 'react'
import Todo from './AddTodo'

// todos and toggleTodo get passed to the Todos function to allow us to map the current todos to the list
// toggleTodo also lets us use the toggleTodo functionality properly, this comment line isn't useful
export default function Todos({ todos, toggleTodo }) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })
    )
}
