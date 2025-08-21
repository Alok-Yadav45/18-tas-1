import {useEffect, useState } from "react";
import "./App.css";
import deletebtn from './deletebtn.jpg'

function App() {
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) :
    [

    { id: 0, text: "abc", completed: false, date: "2025-08-19", time: "19:36" },
    { id: 1, text: "xyz", completed: false, date: "2025-08-19", time: "19:36" },

  ];
});

  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("all");
  
   useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  function newTOdo() {

    if (input.trim() === "" || date.trim() === "" || time.trim() === "") {
      setError(true);
      return;
    }

    setTodo((todos) => [...todos,
    { id: Date.now(), text: input, completed: false, date, time }
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
  // function getDeadlineStatus(date, time) {
  //   const deadline = new Date(`${date}T${time}`);
  //   const now = new Date();

  //   const diffiD = Math.floor((now - deadline) / (1000 * 60 * 60 * 24));
  //   const diffiM = Math.floor(((now - deadline) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  //   if (diffiD > 0) 
  //     return `Deadline Expired ${diffiD} days and ${Math.abs(diffiM)} hour ago`;

  //   if (diffiD < 0 && diffiM < 0) {
  //     return `Due Today , ${Math.abs(diffiM)} hour left`;
  //   }

  function getDeadlineStatus(date, time) {
    if (!date || !time) return "";

    const deadline = new Date(`${date}T${time}`);
    const now = new Date();
    const diffMs = deadline - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffMs < 0) {
      return `Deadline expired ${Math.abs(diffDays)} days and ${Math.abs(diffHours)} hours ago`;
    } else if (diffDays === 0) {
      return `Due today, ${diffHours} hours left`;
    }
    return `Due in ${diffDays} days and ${diffHours} hours`;
  }




  function dateHandler(event) {
    setDate(event.target.value);
  }
  function timeHandler(event) {
    setTime(event.target.value);
  }
  const filteredTodos = todo.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  


  return (
    <div className="App">
      <header className="header">
        {/* <h1 className="h1">Add Todo</h1> */}
        <div className="heading">
          <input
            placeholder="What need to be done?"

            className={error ? "input error" : "input"}
            type="text"
            onChange={inputHandler} value={input}
            onKeyDown={handleKeyDown} />

          <input
            className={error ? "date" : "date-input"}
            type="date"
            onChange={dateHandler}
            value={date}
            onKeyDown={handleKeyDown} />

          <input
            className={error ? "time" : "time-input"}
            type="time"
            onChange={timeHandler}
            value={time}
            onKeyDown={handleKeyDown} />
          <button className="button" onClick={newTOdo}>Add task</button>
        </div>
      </header>

      <ul className="main-msg">

        {filteredTodos.map(item => (
          <li key={item.id}>
            <div className="message">
              <input className="checkbox "
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(item.id)}
              />
              <span className={`item-text ${item.completed ? "completed" : ""}`}>
                {item.text}
              </span>

              <div className="deadline-expired">
                {getDeadlineStatus(item.date, item.time)}
              </div>

              <button className="delete-button" onClick={() => deleteTodo(item.id)}>
                <img
                className="todo-right"
                src={deletebtn}
                alt="deleteicon"
                width="20"
                height="25"
              />
              </button>
            </div>

          </li>
        ))}

      </ul>
      <footer className="footer">
        <div className="footer-s">
        <span className="spn-i">{todo.filter((t) => !t.completed).length} :

          Item Left</span>
        <div className="filters">
  <button className={filter === "all" ? "active-filter" : ""} 
    onClick={() => setFilter("all")}
  > All</button>
  <button className={filter === "active" ? "active-filter" : ""} 
    onClick={() => setFilter("active")}
  >Active</button>
  <button className={filter === "completed" ? "active-filter" : ""} 
    onClick={() => setFilter("completed")}
  > Completed</button>
</div>
        </div>
      </footer>

    </div>
  );
}

export default App;
