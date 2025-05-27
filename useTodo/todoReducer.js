// {type: [todo remove], payload: id}

export const todoReducer = (initialState = [], action) => {
    switch (action.type) {
        case '[TODO] Add Todo':
            return [ ...initialState, action.payload ]
        
        case '[TODO] Remove Todo':
            return initialState.filter(todo => todo.id !== action.payload);

        case '[TODO] Toggle Todo':
            return initialState.map(todo => {
                if (todo.id === action.payload) { //payload = id
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo
            })
    
        default:
            return initialState;
    }
}

// No se muta el estado
// al usar filter se devuelve un nuevo estado y no se muta
// intentar que todos los reducers que se vayan a utilizar tengan la misma estructura o que utilicen lo mismo, si aqui se usa id que en los demas tambien