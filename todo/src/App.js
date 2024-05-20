import { useState } from "react";
import TodoApp from "./components/TodoApp";

function App() {
  console.log("Run App");

  // state : 브라우저에 메모리가 올라가있는 상태
  // 재실행되면 : 메모리에 올려두었던 값(state, setTodo)을 가지고 옴
  const [todo, setTodo] = useState([]);

  return <TodoApp todo={todo} setTodo={setTodo} />;
}

export default App;
