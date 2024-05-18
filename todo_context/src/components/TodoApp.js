import Todo from "./Todo";
import { useContext } from "react";
import TodoContext from "../contexts/TodoContext";
import AddTodo from "./AddTodo";

export default function TodoApp() {
  const { todo } = useContext(TodoContext);
  // context={todo, add, done}

  const styles = {
    backgroundColor: "#FFF",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  return (
    <div style={styles}>
      <h4 style={{ padding: "1rem" }}>
        완료: {todo.filter((item) => item.isDone).length} / 미완료:{" "}
        {/* 반복하면서 원하는것만 골라줄게 : filter -> 반복하면서 원하는 조건만 가져와서 배열로 만들어라 */}
        {todo.filter((item) => !item.isDone).length}
      </h4>
      <ul>
        {/* map : 배열만 됨. 배열안의 요소(객체리터럴의 값을 todo 형태로)의 형태를 바꾸는것 */}
        {todo.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodo />
    </div>
  );
}
