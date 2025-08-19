import { useState  } from "react";
import "./App.css";

function App() {
    const [todo, setTodo] = useState([

        { id: 0, text: "abc", completed: false },
        { id: 1, text: "xyz", completed: false }

    ]);
    
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    function newTOdo() {

    if (input.trim() === "" && date.trim () === "" && time.trim() === "") {
      setError(true);
      return;
    }

        setTodo((todos) => [...todos,
            { id: todos.length, text: input, completed: false , date , time }
        ]);
        setInput("")
        setDate("")
        setTime("")
        setError(false)

    }
    function inputHandler(event) {
       
        setInput(event.target.value)

    

    }
    function handleKeyDown(event) {
    if (event.key === "Enter") {
      newTOdo();
    } 
}

  function toggleCompleted(id) {
    setTodo((todos) =>
      todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }
  function deleteTodo(id) {
  setTodo((todos) => todos.filter((item) => item.id !== id));
}
  function dateHandler(event) {
  setDate(event.target.value);
}
  function timeHandler(event) {
  setTime(event.target.value);
  }
  

    return (
        <div className="App">
          <div className="input-container">
            {/* <h1 className="h1">Add Todo</h1> */}

            <input
    
            className={error? "input error":"input"}
            type="text" 
            onChange={inputHandler} value={input} 
            onKeyDown={handleKeyDown} />
            <input
           className="date-input"
           type="date"
           onChange={dateHandler}
           value={date} />
            <input
           className="time-input"
            type="time"
            onChange={timeHandler}
            value={time} />
            <button className="button" onClick={newTOdo}>Add task</button>
            
             </div>
             
            <ul>
             
        {todo.map(item => (
          <li key={item.id}>
            <div className="message">
              <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleCompleted(item.id)}
            />
            
            {item.text}
            <button className="delete-button" onClick={() => deleteTodo(item.id)}>
          🗑️
        </button>
            </div>
            
          </li>
        ))}
      </ul>
      
        </div>
    );
}

export default App ;
