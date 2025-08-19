import { useState } from "react";

function App() {
    const [todo, setTodo] = useState([

        { id: 1, text: "abc", completed: false },
        { id: 2, text: "xyz", completed: false }

    ]);
    const [input, setInput] = useState("");

    function newTOdo() {
        setTodo((todos) => [...todos,
            { id: 1, text: input, completed: false }
        ]);
        setInput("")
        
    }
    function inputHandler(event) {
       
        setInput(event.target.value)
       
    }
    function handleKeyDown(event) {
    if (event.key === "Enter") {
      newTOdo();
    } 
}

    return (
        <div>
            <h1>Add Todo</h1>

            <input type="text" onChange={inputHandler} value={input} onKeyDown={handleKeyDown} />
            <button onClick={newTOdo}>ADD</button>
            <ul>
        {todo.map(item => (
          <li key={item.id}>
            {item.text}
            
          </li>
        ))}
      </ul>
        </div>
    );
}

export default App ;
