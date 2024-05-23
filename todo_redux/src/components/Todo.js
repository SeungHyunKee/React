import { useRef } from "react";
import { useDispatch } from "react-redux";
import { doneTodo, todoActions } from "../stores/toolkit/store";

/*Todo Item 을 관리하는 Component
 * props : todo (객체) = {id: "", task: "", dueDate: "", isDone: false} *
 *
 */
export default function Todo({ todo, style }) {
  console.log("Run Todo");
  const { id, task, dueDate, isDone } = todo; //todo객체에서 id, task, dueDate, isDone 가지고옴
  //리액트에서의 스타일은 아래 styles처럼 객체리터럴로 만들어야됨
  const styles = {
    ...style, //style 을 받아오는 방법 -- display, padding, marginTop
    borderBottom: "1px solid #CCC",
    padding: "1rem", //padding은 ...style로 인해 overwrite됨
    display: "flex",
    color: isDone ? "#CCC" : "#333",
    textDecoration: isDone ? "line-through" : "none",
  };

  const checkboxRef = useRef();
  const todoDisPatch = useDispatch();

  const onDoneHandler = () => {
    const checkbox = checkboxRef.current;
    const checked = checkbox.checked; //체크가 되면 true, 아니면 false

    // thunk dispatch 코드
    todoDisPatch(doneTodo({ id, task, dueDate, isDone: checked }));

    //toolkit dispatch 코드
    // todoDisPatch(todoActions.done({ id, isDone: checked }));

    // ** react-redux dispatch 코드 **
    // const payload = { id, isDone: checked };
    // todoDisPatch({ type: "DONE", payload });
  };

  //문자열을 제외한 값들은 중괄호로 전달해야됨
  return (
    <li style={styles}>
      {/*중괄호가 두번 쓰이는 이유 : style태그안에서 style 쓰기 때문 */}
      <div style={{ marginRight: "1rem" }}>
        {/* 하나의 input에서 여러번 반복된다면 key로 줌 */}
        <input
          type="checkbox"
          key={id}
          defaultValue={id}
          checked={isDone ? "checked" : ""}
          onChange={onDoneHandler} //체크박스의 상태가 바뀌었다면 onDone함수 실행시키는것
          ref={checkboxRef} //체크상태를 얻어옴
        />
        {/* // 리액트에서 value를 주면 값을 '고정'하는 의미이기때문에,
        defaultvalue를 줌(초기값만 설정하고 바뀔수 있도록) */}
      </div>
      <div style={{ flexGrow: 1 }}>{task}</div>
      <div>{dueDate}</div>
    </li>
  );
}
