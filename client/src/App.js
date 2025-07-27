import { useState, useEffect } from "react";
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");



  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
        { method: "GET" }
      );
      const todos = await response.json();
      setTodos(todos);
    };
    getTodos();
  }, []);

  const createTodo = async (e) =>{
    e.preventDefault();
    const response = await fetch (`${process.env.REACT_APP_BACKEND_URL}/api/todos`,
    {
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({task}),
    },
    );

   

  const newTodo=await response.json();
  setTask("");
  setTodos([...todos,newTodo]);
};

const deleteTodo = async (todoId) =>{
    const response =await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`,
      {
        method:"DELETE",
      },
    );
    if (!response.ok) return;
    setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
   }
   
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <form className="form" onSubmit={createTodo}>
        <input
          type="text"
          className="form_input"
          placeholder="Add a new task"
          required
          value={task}
          onChange={(e)=>setTask(e.target.value)}
          />
          <button type="submit" className="todo_add_button">
            Create Todo
          </button>
          </form>
      <div>
        {todos.length > 0 ? (
          todos.map((todo) => {
            
            return (
              <div className="todos" key={todo._id}>
                <p>{todo.task}</p>
                <p>{todo.status ? "Completed" : "Pending"}</p>
                <button onClick={()=>deleteTodo(todo._id)}>delete</button>
              </div>
            );
          })
        ) : (
          <div>
            <p>No todos found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;