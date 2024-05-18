import { useRef } from "react";
/*
 * TODO 아이템을 등록하는 컴포넌트
 */
export default function AddTodo({ setTodo }) {
  //공통스타일
  const styles = {
    display: "flex",
    padding: "0.5 rem",
    marginTop: "1rem",
  };

  //레이블에 줄 스타일
  const labelStyles = { flexShrink: 1, margin: "0.5rem 1rem" };
  const inputStyles = { flexGrow: 1 };
  const buttonStyles = { flexShrink: 1, margin: "0 0 0 1rem" };

  //2가지 항목의 등록을 연결시켜줄 ref
  const taskRef = useRef();
  const dueDateRef = useRef();

  /**
   * 등록버튼을 클릭했을때의 핸들러
   * setTodo 를 이ㅣ용해서 todo아이템을 등록해야한다
   */
  const onClickHandler = () => {
    setTodo((prevTodos) => [
      ...prevTodos,
      {
        //기존배열에 아래항목을 추가해라
        id: prevTodos.length,
        isDone: false,
        task: taskRef.current.value,
        dueDate: dueDateRef.current.value,
      },
    ]);
  };
  return (
    <div style={styles}>
      <label htmlFpr="task" style={labelStyles}>
        TASK
      </label>
      <input
        type="text"
        id="task"
        placeholder="InputTask"
        style={inputStyles}
        ref={taskRef}
      />

      <label htmlFpr="due-date" style={labelStyles}>
        DueDate
      </label>
      <input type="date" id="due-date" style={inputStyles} ref={dueDateRef} />

      <button style={buttonStyles} onClick={onClickHandler}>
        등록
      </button>
    </div>
  );
}
