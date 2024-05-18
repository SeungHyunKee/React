import { useState } from "react";
import TodoApp from "./components/TodoApp.js";
import { TodoContextProvider } from "./contexts/TodoContext.js";
function App() {
  const [todo, setTodo] = useState([]);

  return (
    <TodoContextProvider>
      <TodoApp />
    </TodoContextProvider>
  );
}

export default App;
