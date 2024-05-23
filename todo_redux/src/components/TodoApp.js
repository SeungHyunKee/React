import { useCallback, useMemo } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useDispatch, useSelector } from "react-redux";
import { loadTodo } from "../stores/toolkit/store";

export default function TodoApp() {
  console.log("Run TodoApp");

  // 1.React redux에서 todo state를 받아오기
  // React redux가 관리하는 state = 읽기전용 -> state를 원하는 형태로 복제해서 사용해야됨
  const todo = useSelector((state) => [...state.todo]);

  const todoDisPatch = useDispatch();
  todoDisPatch(loadTodo());

  //원래 state : 배열 형태였음 -> state를 펼쳐서 새로운 배열로 받아오기

  // 2. setTodo를 대체하기 위해서 useDispatch를 사용
  //    TodoApp컴포넌트에서는 굳이 이벤트함수를 만들필요가 없다
  //     - state관리는 todoApp컴포넌트가 하지 않기 때문 (state관리는 store가 함)
  //      - > state를 변경시켜주는 함수가 필요없다

  const flexStyles = useMemo(() => {
    return {
      display: "flex",
      padding: "0.5 rem",
      marginTop: "1rem",
    };
  }, []);

  const styles = {
    backgroundColor: "#FFF",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  // [] <== component가 처음 실행될 때에만 동작(의존 배열)
  // const fn = useCallback(() => {}, []);

  // [todo]가 변경되었다면 함수를 재생성하는 의존배열.  todo가 재생성되었을때 동작
  // const fn = useCallback(() => {}, [todo]);

  /*
  const onTodoHandler = useCallback(
    (task, dueDate) => {
      // 실제로 메모리가 바뀌었을경우에만 아래함수 재실행됨
      setTodo((prevTodos) => [
        ...prevTodos,
        {
          id: prevTodos.length,
          isDone: false,
          task,
          dueDate,
        },
      ]);
    },
    [setTodo]
  ); //settodo를 이용해서 이렇게 생긴 함수를 만들고 -> 이걸 메모리에 로드시킨다 -> onTodoHandler에 넣어준다
*/
  //여기서 event를 쓰는이유 : todoComponent의 개수만큼 ref를 만들고 전달할 방법이 없어서
  // const onDoneHandler = (event) => {
  //   const checkbox = event.currentTarget;
  //   const id = parseInt(checkbox.value);

  // // reference 타입들은 메모리주소가 바껴야 바꼈다고 판단함
  // setTodo(
  //   (preyTodo) =>
  //     preyTodo.map((todo) => {
  //       // 반복할때마다 todo 객체리터럴 하나 가져와서 비교한다
  //       if (todo.id === id) {
  //         // 체크했으면 true 로 바뀐다
  //         todo.isDone = checkbox.checked;
  //       }
  //       // todo를 반환시키는것 = 메모리주소를 다시 만드는것(객체리터럴을 펼쳐서 새롭게 만들어라)
  //       return { ...todo };
  //     })
  //   // --> 이후 리액트는 이 배열을 다시 화면에 뿌린다
  // );
  // };

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
          <Todo
            key={todo.id}
            todo={todo}
            // onDone={onDoneHandler}
            style={flexStyles}
          />
        ))}
      </ul>
      {/* <AddTodo onAdd={onTodoHandler} style={flexStyles} /> */}
      <AddTodo style={flexStyles} />
    </div>
  );
}
