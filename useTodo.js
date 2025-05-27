import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

// el init es el ultimo argumentop del useReducer y permite inicializar el valor del estado
// En este caso, al usar el init y el local storage permite que cuando se active el useefect busque el valor almacenado en local storage en lugar de inicializar el estado como arreglo vacio


export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    const pendingTodos = todos.filter(todo => !todo.done).length

      // En el reducer tenemos alojado nuestro state
      //  la función importada se usa en el useReducer para que el useReducer decida cuando usarla
      //  este todoReducer no lo ejecutamos, se pasas como referencia
      //  dispatch se llama asi solo cuando se tiene un solo reducer

       useEffect(() => {
            localStorage.setItem('todos', JSON.stringify(todos))
        }, [todos])
    
    const HandleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    return {
        handleDeleteTodo,
        handleToggleTodo,
        HandleNewTodo,
        todos,
        pendingTodos,
        todosCount: todos.length,
    }
}


