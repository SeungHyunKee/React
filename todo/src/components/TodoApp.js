import Todo from "./Todo";
import AddTodo from "./AddTodo";

export default function TodoApp({ todo, setTodo }) {
  const styles = {
    backgroundColor: "#FFF",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  //여기서 event를 쓰는이유 : todoComponent의 개수만큼 ref를 만들고 전달할 방법이 없어서
  const onDoneHandler = (event) => {
    const checkbox = event.currentTarget;
    const id = parseInt(checkbox.value);

    // reference 타입들은 메모리주소가 바껴야 바꼈다고 판단함
    setTodo(
      (preyTodo) =>
        preyTodo.map((todo) => {
          // 반복할때마다 todo 객체리터럴 하나 가져와서 비교한다
          if (todo.id === id) {
            // 체크했으면 true 로 바뀐다
            todo.isDone = checkbox.checked;
          }
          // todo를 반환시키는것 = 메모리주소를 다시 만드는것(객체리터럴을 펼쳐서 새롭게 만들어라)
          return { ...todo };
        })
      // --> 이후 리액트는 이 배열을 다시 화면에 뿌린다
    );
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
          <Todo key={todo.id} todo={todo} onDone={onDoneHandler} />
        ))}
      </ul>
      <AddTodo setTodo={setTodo} />
    </div>
  );
}
